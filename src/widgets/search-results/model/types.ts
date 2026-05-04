export type SearchProduct = {
  id: string;
  name: string;
  cost: string;
  costWithDiscount: string;
  category: string | null;
  subcategory: string | null;
  cashback: number;
  brand: string | null;
  seller: string | null;
  sellerRating: number | null;
  rating: number | null;
  reviews: number | null;
  remaining: number | null;
  link: string;
  imageLink: string | null;
};

export type SearchFilterOption = {
  label: string;
  count?: number;
  swatch?: 'white' | 'green';
};

export type SearchFilterGroup = {
  title: string;
  options: SearchFilterOption[];
};
