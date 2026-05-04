export type RegisterPreferences = {
  id: number;
  price: number;
  delivery: number;
  rating: number;
};

export type RegisterRequest = {
  id: number;
  name: string;
  email: string;
  password: string;
  preferencesId: number;
  preferences: RegisterPreferences;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = Record<string, unknown> | string | undefined;
