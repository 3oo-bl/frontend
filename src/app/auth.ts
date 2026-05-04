const AUTH_STORAGE_KEY = 'client-authorized';
const PERSONAL_TOKEN_STORAGE_KEY = 'personal-token';

export const isAuthorized = () => {
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
};

export const getPersonalToken = () => {
  return window.localStorage.getItem(PERSONAL_TOKEN_STORAGE_KEY);
};

export const authorizeClient = (personalToken?: string | null) => {
  window.localStorage.setItem(AUTH_STORAGE_KEY, 'true');

  if (personalToken) {
    window.localStorage.setItem(PERSONAL_TOKEN_STORAGE_KEY, personalToken);
    return;
  }

  window.localStorage.removeItem(PERSONAL_TOKEN_STORAGE_KEY);
};

export const logoutClient = () => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.localStorage.removeItem(PERSONAL_TOKEN_STORAGE_KEY);
};
