export type RegisterPreferences = {
  price: number;
  delivery: number;
  sellerRating: number;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  preferences: RegisterPreferences;
};

export type RegisterResponse = Record<string, unknown>;
