import type { AuthResponse, LoginRequest } from '../model/types';
import { parseApiError, parseApiSuccess } from './shared';

const LOGIN_PATH = '/auth/login';
const DEFAULT_LOGIN_ERROR = 'Не удалось авторизоваться';

export const loginUser = async (payload: LoginRequest) => {
  const response = await fetch(LOGIN_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response, DEFAULT_LOGIN_ERROR));
  }

  return (await parseApiSuccess(response)) as AuthResponse;
};
