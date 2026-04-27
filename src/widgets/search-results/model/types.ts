export type StorageOption = {
  id: string;
  label: string;
  isActive?: boolean;
};

export type MarketplaceOffer = {
  marketplace: string;
  price: string;
  href: string;
};

export type SearchProduct = {
  id: string;
  title: string;
  storageLabel: string;
  specs: string[];
  storageOptions: StorageOption[];
  offers: MarketplaceOffer[];
  priceRange: {
    from: string;
    to: string;
  };
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
