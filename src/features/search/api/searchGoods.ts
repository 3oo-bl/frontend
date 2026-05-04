import { getPersonalToken } from '@/app/auth';
import type { SearchProduct } from '@/widgets/search-results/model/types';
import type {
  GoodsSearchFilters,
  GoodsSearchPollResult,
  PollGoodsSearchRequest,
  StartGoodsSearchRequest,
} from '../model/types';

const SEARCH_PATH = '/goods/search';
const DEFAULT_SEARCH_ERROR = 'Не удалось получить результаты поиска';

const appendFilterParams = (searchUrl: URL, filters: GoodsSearchFilters) => {
  if (filters.minPrice > 0) {
    searchUrl.searchParams.set('MinPrice', String(filters.minPrice));
  }

  if (filters.minReviews > 0) {
    searchUrl.searchParams.set('MinReviews', String(filters.minReviews));
  }

  if (filters.minRating > 0) {
    searchUrl.searchParams.set('MinRating', String(filters.minRating));
  }

  if (filters.sortBy) {
    searchUrl.searchParams.set('SortBy', filters.sortBy);

    if (filters.sortBy === 'price') {
      searchUrl.searchParams.set('OrderBy', filters.orderBy);
    }
  }
};

const toRecord = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
};

const readString = (record: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return null;
};

const readIdentifier = (record: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }

    if (typeof value === 'number' && Number.isFinite(value)) {
      return String(value);
    }
  }

  return null;
};

const readNumber = (record: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string') {
      const parsedValue = Number(value);

      if (Number.isFinite(parsedValue)) {
        return parsedValue;
      }
    }
  }

  return null;
};

const readArray = (record: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = record[key];

    if (Array.isArray(value)) {
      return value;
    }
  }

  return null;
};

const parsePriceValue = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return null;
  }

  const normalizedValue = value.replace(/[^\d.,-]/g, '').replace(',', '.');
  const parsedValue = Number(normalizedValue);

  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const formatPrice = (value: number | null) => {
  if (value == null) {
    return '—';
  }

  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(value);
};

const getAuthorizationToken = () => {
  const token = getPersonalToken();

  if (!token) {
    throw new Error('Не найден токен авторизации. Войдите в аккаунт заново.');
  }

  return token;
};

const parseResponsePayload = async (response: Response) => {
  const responseText = await response.text();

  if (!responseText) {
    return undefined;
  }

  try {
    return JSON.parse(responseText) as unknown;
  } catch {
    return responseText;
  }
};

const parseErrorMessage = async (response: Response) => {
  const payload = await parseResponsePayload(response);

  if (typeof payload === 'string' && payload.trim()) {
    return payload;
  }

  const payloadRecord = toRecord(payload);

  if (!payloadRecord) {
    return DEFAULT_SEARCH_ERROR;
  }

  return (
    readString(payloadRecord, ['message', 'error', 'detail']) ?? DEFAULT_SEARCH_ERROR
  );
};

const extractSearchToken = (payload: unknown) => {
  if (typeof payload === 'string' && payload.trim()) {
    return payload.trim();
  }

  const payloadRecord = toRecord(payload);

  if (!payloadRecord) {
    return null;
  }

  const directToken = readIdentifier(payloadRecord, [
    'token',
    'jobId',
    'searchToken',
    'personalToken',
    'id',
  ]);

  if (directToken) {
    return directToken;
  }

  const nestedPayload = toRecord(payloadRecord.data);

  if (!nestedPayload) {
    return null;
  }

  return readIdentifier(nestedPayload, [
    'token',
    'jobId',
    'searchToken',
    'personalToken',
    'id',
  ]);
};

const getPayloadItems = (payload: unknown): unknown[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  const payloadRecord = toRecord(payload);

  if (!payloadRecord) {
    return [];
  }

  const directItems = readArray(payloadRecord, [
    'items',
    'goods',
    'products',
    'results',
    'offers',
  ]);

  if (directItems) {
    return directItems;
  }

  const nestedPayload = toRecord(payloadRecord.data);

  if (!nestedPayload) {
    return [];
  }

  return (
    readArray(nestedPayload, ['items', 'goods', 'products', 'results', 'offers']) ?? []
  );
};

const normalizeProduct = (value: unknown, index: number): SearchProduct | null => {
  const productRecord = toRecord(value);

  if (!productRecord) {
    return null;
  }

  const name =
    readString(productRecord, ['name', 'title', 'item', 'productName']) ??
    `Товар ${index + 1}`;
  const id =
    readIdentifier(productRecord, ['id', 'productId', 'sku', 'article']) ??
    `${name}-${index + 1}`;
  const cost =
    readNumber(productRecord, ['cost', 'price', 'minPrice', 'priceFrom']) ??
    parsePriceValue(productRecord.price);
  const costWithDiscount =
    readNumber(productRecord, ['costWithDiscount', 'oldPrice', 'maxPrice', 'priceTo']) ??
    parsePriceValue(productRecord.costWithDiscount);

  return {
    id,
    name,
    cost: formatPrice(cost),
    costWithDiscount: formatPrice(costWithDiscount ?? cost),
    category: readString(productRecord, ['category']),
    subcategory: readString(productRecord, ['subcategory']),
    cashback: readNumber(productRecord, ['cashback']) ?? 0,
    brand: readString(productRecord, ['brand']),
    seller: readString(productRecord, ['seller']),
    sellerRating: readNumber(productRecord, ['sellerRating']),
    rating: readNumber(productRecord, ['rating']),
    reviews: readNumber(productRecord, ['reviews']),
    remaining: readNumber(productRecord, ['remaining', 'stock']),
    link: readString(productRecord, ['link', 'url', 'href']) ?? '#',
    imageLink: readString(productRecord, ['imageLink', 'image', 'imageUrl']),
  };
};

const normalizeProducts = (payload: unknown) => {
  return getPayloadItems(payload)
    .map((item, index) => normalizeProduct(item, index))
    .filter((item): item is SearchProduct => item != null);
};

export const startGoodsSearch = async (
  payload: StartGoodsSearchRequest,
  signal?: AbortSignal,
) => {
  const response = await fetch(SEARCH_PATH, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAuthorizationToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: payload.item,
      markets: [],
      quantity: payload.quantity,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const searchToken = extractSearchToken(await parseResponsePayload(response));

  if (!searchToken) {
    throw new Error('Сервер не вернул токен поиска');
  }

  return searchToken;
};

export const pollGoodsSearch = async (
  payload: PollGoodsSearchRequest,
  signal?: AbortSignal,
): Promise<GoodsSearchPollResult> => {
  const searchUrl = new URL(
    `${SEARCH_PATH}/${encodeURIComponent(payload.searchToken)}`,
    window.location.origin,
  );

  searchUrl.searchParams.set('personalToken', payload.searchToken);
  searchUrl.searchParams.set('skip', String(payload.skip));
  searchUrl.searchParams.set('take', String(payload.take));
  appendFilterParams(searchUrl, payload.filters);

  const response = await fetch(`${searchUrl.pathname}${searchUrl.search}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAuthorizationToken()}`,
    },
    signal,
  });

  if (response.status === 202) {
    return {
      status: 'pending',
    };
  }

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return {
    status: 'completed',
    products: normalizeProducts(await parseResponsePayload(response)),
  };
};
