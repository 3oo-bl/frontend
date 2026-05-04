import type { SearchProduct } from '@/widgets/search-results/model/types';

export type GoodsSearchSortBy = 'price' | 'rating' | 'reviews';
export type GoodsSearchOrderBy = 'asc' | 'desc';

export type GoodsSearchFilters = {
  minPrice: number;
  minReviews: number;
  minRating: number;
  sortBy: GoodsSearchSortBy | null;
  orderBy: GoodsSearchOrderBy;
};

export type StartGoodsSearchRequest = {
  item: string;
  quantity: number;
};

export type PollGoodsSearchRequest = {
  searchToken: string;
  skip: number;
  take: number;
  filters: GoodsSearchFilters;
};

export type GoodsSearchPollResult =
  | {
      status: 'pending';
    }
  | {
      status: 'completed';
      products: SearchProduct[];
    };
