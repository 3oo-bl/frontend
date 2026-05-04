import type { AuthResponse, RegisterRequest } from '../model/types';
import { parseApiError, parseApiSuccess } from './shared';

const REGISTER_PATH = '/auth/register';
const DEFAULT_REGISTER_ERROR = 'Не удалось зарегистрироваться';

export const registerUser = async (payload: RegisterRequest) => {
  const response = await fetch(REGISTER_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response, DEFAULT_REGISTER_ERROR));
  }

  return (await parseApiSuccess(response)) as AuthResponse;
};
