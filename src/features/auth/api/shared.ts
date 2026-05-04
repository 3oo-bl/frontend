type ApiSuccessPayload = Record<string, unknown> | string | undefined;

const DEFAULT_AUTH_ERROR = 'Не удалось выполнить запрос';

const getErrorMessageFromPayload = (payload: unknown) => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const payloadRecord = payload as Record<string, unknown>;
  const candidates = ['message', 'error', 'detail'] as const;

  for (const key of candidates) {
    const value = payloadRecord[key];

    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return null;
};

const parseResponseText = async (response: Response) => {
  const responseText = await response.text();

  if (!responseText) {
    return undefined;
  }

  try {
    return JSON.parse(responseText) as Record<string, unknown>;
  } catch {
    return responseText;
  }
};

export const parseApiError = async (
  response: Response,
  fallbackMessage = DEFAULT_AUTH_ERROR,
) => {
  const parsedResponse = await parseResponseText(response);

  if (typeof parsedResponse === 'string') {
    return parsedResponse;
  }

  return getErrorMessageFromPayload(parsedResponse) ?? fallbackMessage;
};

export const parseApiSuccess = async (response: Response): Promise<ApiSuccessPayload> => {
  if (response.status === 204) {
    return undefined;
  }

  return parseResponseText(response);
};

export const extractPersonalToken = (payload: unknown) => {
  if (typeof payload === 'string' && payload.trim()) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const payloadRecord = payload as Record<string, unknown>;
  const candidates = ['personalToken', 'token', 'accessToken'] as const;

  for (const key of candidates) {
    const value = payloadRecord[key];

    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  const nestedPayload = payloadRecord.data;

  if (!nestedPayload || typeof nestedPayload !== 'object') {
    return null;
  }

  const nestedRecord = nestedPayload as Record<string, unknown>;

  for (const key of candidates) {
    const value = nestedRecord[key];

    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return null;
};
