const AUTH_STORAGE_KEY = 'client-authorized';

export const isAuthorized = () => {
  return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
};

export const authorizeClient = () => {
  window.localStorage.setItem(AUTH_STORAGE_KEY, 'true');
};

export const logoutClient = () => {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
};
