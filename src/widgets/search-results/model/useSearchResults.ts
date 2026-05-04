import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pollGoodsSearch, startGoodsSearch } from '@/features/search';
import type {
  GoodsSearchFilters,
  GoodsSearchOrderBy,
  GoodsSearchSortBy,
} from '@/features/search';
import type { SearchProduct } from './types';

type UseSearchResultsParams = {
  query: string;
};

const RESULTS_PER_PAGE = 20;
const POLL_DELAY_MS = 1000;
const DEFAULT_FILTERS: GoodsSearchFilters = {
  minPrice: 0,
  minReviews: 0,
  minRating: 0,
  sortBy: null,
  orderBy: 'asc',
};

const waitForNextPoll = (signal: AbortSignal) => {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      signal.removeEventListener('abort', handleAbort);
      resolve();
    }, POLL_DELAY_MS);

    const handleAbort = () => {
      window.clearTimeout(timeoutId);
      reject(new DOMException('Request aborted', 'AbortError'));
    };

    signal.addEventListener('abort', handleAbort, { once: true });
  });
};

export const useSearchResults = ({ query }: UseSearchResultsParams) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(query);
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [draftFilters, setDraftFilters] = useState<GoodsSearchFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<GoodsSearchFilters>(DEFAULT_FILTERS);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setErrorMessage('');
      setIsLoading(false);
      setIsPolling(false);
      return;
    }

    const abortController = new AbortController();

    const loadResults = async () => {
      setErrorMessage('');
      setIsLoading(true);
      setIsPolling(false);
      setProducts([]);

      try {
        const searchToken = await startGoodsSearch(
          {
            item: query,
            quantity: RESULTS_PER_PAGE,
          },
          abortController.signal,
        );

        while (!abortController.signal.aborted) {
          const searchResult = await pollGoodsSearch(
            {
              searchToken,
              skip: 0,
              take: RESULTS_PER_PAGE,
              filters: appliedFilters,
            },
            abortController.signal,
          );

          if (searchResult.status === 'completed') {
            setProducts(searchResult.products);
            setIsLoading(false);
            setIsPolling(false);
            return;
          }

          setIsLoading(false);
          setIsPolling(true);
          await waitForNextPoll(abortController.signal);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setErrorMessage(
          error instanceof Error && error.message
            ? error.message
            : 'Не удалось получить результаты поиска',
        );
        setProducts([]);
        setIsLoading(false);
        setIsPolling(false);
      }
    };

    void loadResults();

    return () => {
      abortController.abort();
    };
  }, [appliedFilters, query]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleFilterValueChange = (
    field: 'minPrice' | 'minReviews' | 'minRating',
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const nextValue = Number(event.currentTarget.value);

    setDraftFilters((prev) => ({
      ...prev,
      [field]: Number.isFinite(nextValue) ? nextValue : 0,
    }));
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSortBy = event.currentTarget.value;

    setDraftFilters((prev) => ({
      ...prev,
      sortBy: nextSortBy === '' ? null : (nextSortBy as GoodsSearchSortBy),
    }));
  };

  const handleOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextOrderBy = event.currentTarget.value as GoodsSearchOrderBy;

    setDraftFilters((prev) => ({
      ...prev,
      orderBy: nextOrderBy,
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
  };

  const handleResetFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextQuery = searchValue.trim();

    if (nextQuery === '') {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(nextQuery)}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  return {
    appliedFilters,
    draftFilters,
    errorMessage,
    handleApplyFilters,
    handleBack,
    handleFilterValueChange,
    handleOrderChange,
    handleResetFilters,
    handleSearchChange,
    handleSortChange,
    handleSubmit,
    isLoading,
    isPolling,
    products,
    resultsPerPage: RESULTS_PER_PAGE,
    searchValue,
  };
};
