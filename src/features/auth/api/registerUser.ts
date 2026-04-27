import type { RegisterRequest, RegisterResponse } from '../model/types';

const REGISTER_PATH = '/auth/register';
const DEFAULT_REGISTER_ERROR = 'Не удалось зарегистрироваться';

const getRegisterUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    throw new Error('Не задан VITE_API_URL');
  }

  return new URL(REGISTER_PATH, apiUrl).toString();
};

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

const parseErrorMessage = async (response: Response) => {
  const responseText = await response.text();

  if (!responseText) {
    return DEFAULT_REGISTER_ERROR;
  }

  const isJsonResponse = response.headers
    .get('content-type')
    ?.includes('application/json');

  if (!isJsonResponse) {
    return responseText;
  }

  try {
    const payload = JSON.parse(responseText) as unknown;

    return getErrorMessageFromPayload(payload) ?? DEFAULT_REGISTER_ERROR;
  } catch {
    return DEFAULT_REGISTER_ERROR;
  }
};

const parseSuccessResponse = async (response: Response) => {
  if (response.status === 204) {
    return undefined;
  }

  const responseText = await response.text();

  if (!responseText) {
    return undefined;
  }

  try {
    return JSON.parse(responseText) as RegisterResponse;
  } catch {
    return undefined;
  }
};

export const registerUser = async (payload: RegisterRequest) => {
  const response = await fetch(getRegisterUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return parseSuccessResponse(response);
};
