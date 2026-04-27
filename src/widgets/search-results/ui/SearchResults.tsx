import { filterGroups, searchProducts } from '../model/content';
import type {
  MarketplaceOffer,
  SearchFilterGroup,
  SearchProduct,
  StorageOption,
} from '../model/types';
import { useSearchResults } from '../model/useSearchResults';

type SearchResultsProps = {
  query: string;
};

const formatSearchTitle = (query: string) => {
  if (query === '') {
    return 'Результаты поиска';
  }

  return `Результаты поиска: ${query}`;
};

const ProductMockImage = () => {
  return (
    <div
      aria-hidden="true"
      className="relative h-full min-h-[180px] w-full overflow-hidden rounded-md bg-[#f4f4f4] shadow-inner"
    >
      <div className="absolute left-[18%] top-[18%] h-[70%] w-[24%] rounded-[18px] bg-gradient-to-b from-[#f8f8f8] to-[#d8d8d8] shadow-[8px_8px_18px_rgba(0,0,0,0.18)]">
        <span className="absolute left-[20%] top-[9%] h-4 w-4 rounded-full bg-[#151515]" />
        <span className="absolute right-[20%] top-[9%] h-4 w-4 rounded-full bg-[#151515]" />
        <span className="absolute left-[20%] top-[24%] h-4 w-4 rounded-full bg-[#151515]" />
        <span className="absolute right-[20%] top-[24%] h-4 w-4 rounded-full bg-[#151515]" />
        <span className="absolute bottom-[14%] left-1/2 h-12 w-[2px] -translate-x-1/2 rounded-full bg-[#95a1b7]" />
      </div>
      <div className="absolute right-[12%] top-[11%] h-[78%] w-[43%] rounded-[18px] bg-gradient-to-br from-[#222] via-[#3d3d35] to-[#b6a06b] p-[8px] shadow-[10px_12px_20px_rgba(0,0,0,0.22)]">
        <div className="h-full w-full rounded-[12px] bg-[radial-gradient(circle_at_55%_45%,#393939_0%,#2c2c2c_38%,#151515_70%)]" />
      </div>
    </div>
  );
};

const FilterGroup = ({ group }: { group: SearchFilterGroup }) => {
  return (
    <section className="border-t border-white/8 py-4 first:border-t-0 first:pt-0">
      <button
        className="flex w-full items-center justify-between text-left text-xs font-bold text-white"
        type="button"
      >
        {group.title}
        <span className="text-white/45">⌄</span>
      </button>

      <div className="mt-3 space-y-2">
        {group.options.map((option) => {
          if (option.swatch) {
            const swatchClass =
              option.swatch === 'green'
                ? 'border-[#1cc769] bg-[#0d9e50]'
                : 'border-white bg-white';

            return (
              <button
                key={option.label}
                aria-label={option.label}
                className={`mr-2 inline-flex h-6 w-6 rounded-full border-2 ${swatchClass}`}
                type="button"
              />
            );
          }

          return (
            <button
              key={option.label}
              className="flex w-full items-center justify-between gap-3 text-left text-[11px] text-white/68 transition hover:text-white"
              type="button"
            >
              <span>{option.label}</span>
              {option.count != null ? <span>{option.count}</span> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
};

const StoragePill = ({ option }: { option: StorageOption }) => {
  const className = option.isActive
    ? 'border-[#22984e] bg-[#22984e] text-white'
    : 'border-[#22984e] text-white';

  return (
    <button
      className={`h-7 min-w-20 rounded-full border px-4 text-[11px] font-bold transition hover:bg-[#22984e] ${className}`}
      type="button"
    >
      {option.label}
    </button>
  );
};

const MarketplaceRow = ({ offer }: { offer: MarketplaceOffer }) => {
  return (
    <a
      className="grid grid-cols-[minmax(72px,1fr)_34px_minmax(72px,auto)_auto] items-center gap-2 text-[11px] font-bold text-white transition hover:text-[#d3fa52]"
      href={offer.href}
    >
      <span>{offer.marketplace}</span>
      <span className="h-px bg-white/75" />
      <span>{offer.price}</span>
      <span className="border-b border-white/80 leading-none">В магазин</span>
    </a>
  );
};

const ProductCard = ({ product }: { product: SearchProduct }) => {
  return (
    <article
      className="grid gap-4 bg-[#202020] p-4 last:border-b-0 md:grid-cols-[170px_1fr] lg:grid-cols-[190px_1fr_300px] lg:p-5"
      data-id="search-product-card"
    >
      <ProductMockImage />

      <div className="min-w-0">
        <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
          <h2 className="text-2xl font-black leading-tight text-white lg:text-3xl">
            {product.title}
          </h2>
          <span className="pt-1 text-xs font-bold text-white/48">{product.storageLabel}</span>
        </div>

        <ul className="mt-3 max-w-[560px] text-xs font-bold leading-4 text-white">
          {product.specs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-3">
          {product.storageOptions.map((option) => (
            <StoragePill key={option.id} option={option} />
          ))}
        </div>
      </div>

      <aside className="bg-[#191919] p-4 lg:-my-5 lg:-mr-5 lg:flex lg:flex-col lg:justify-center lg:p-6">
        <p className="text-xl font-black text-white lg:text-2xl">
          от <span className="text-3xl lg:text-4xl">{product.priceRange.from}</span> до{' '}
          {product.priceRange.to} ₽
        </p>

        <div className="mt-4 space-y-3">
          {product.offers.map((offer) => (
            <MarketplaceRow key={offer.marketplace} offer={offer} />
          ))}
        </div>
      </aside>
    </article>
  );
};

export const SearchResults = ({ query }: SearchResultsProps) => {
  const { handleBack, handleSearchChange, handleSubmit, searchValue } = useSearchResults({
    query,
  });

  return (
    <section
      className="mx-auto w-full max-w-[1220px] flex-1 px-4 pb-10 pt-8 sm:px-8 lg:px-10"
      data-id="search-results-page"
    >
      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-black text-white">{formatSearchTitle(query)}</h1>
        </div>
      </div>

      <form
        className="mt-5 grid gap-3 lg:grid-cols-[170px_minmax(280px,1fr)_160px_160px_84px]"
        onSubmit={handleSubmit}
      >
        <button
          className="h-11 rounded-md border border-[#22984e] text-xs font-bold text-white transition hover:bg-[#22984e]"
          onClick={handleBack}
          type="button"
        >
          ‹ Назад
        </button>

        <label className="sr-only" htmlFor="search-results-query">
          Поиск товара
        </label>
        <input
          className="h-11 min-w-0 rounded-md border border-white bg-white px-4 text-xs text-[#2f2f2f] outline-none placeholder:text-[#9b9b9b] focus:border-[#d3fa52]"
          id="search-results-query"
          onChange={handleSearchChange}
          placeholder="Введите поисковый запрос или артикул (например, товара WB/Ozon)"
          type="text"
          value={searchValue}
        />

        <button
          className="h-11 rounded-md border border-[#22984e] px-3 text-[11px] font-bold text-white/70 transition hover:bg-[#22984e] hover:text-white"
          type="button"
        >
          Сортировать по: Позиции
        </button>

        <button
          className="h-11 rounded-md border border-[#22984e] px-3 text-[11px] font-bold text-white/70 transition hover:bg-[#22984e] hover:text-white"
          type="button"
        >
          Показать: 30 на странице
        </button>

        <div className="grid h-11 grid-cols-2 overflow-hidden rounded-md bg-[#22984e]">
          <button aria-label="Вид сеткой" className="grid place-items-center" type="button">
            <span className="grid grid-cols-2 gap-1">
              <span className="h-2 w-2 bg-black" />
              <span className="h-2 w-2 bg-black" />
              <span className="h-2 w-2 bg-black" />
              <span className="h-2 w-2 bg-black" />
            </span>
          </button>
          <button aria-label="Вид списком" className="grid place-items-center" type="button">
            <span className="space-y-1">
              <span className="block h-1 w-5 bg-black" />
              <span className="block h-1 w-5 bg-black" />
              <span className="block h-1 w-5 bg-black" />
            </span>
          </button>
        </div>
      </form>

      <div className="mt-4 grid gap-4 lg:grid-cols-[170px_minmax(0,1fr)]">
        <aside
          className="rounded-md bg-[#191919] p-4 ring-1 ring-white/8 lg:rounded-none lg:p-3 lg:ring-0"
          data-id="search-filters"
        >
          <div className="mb-4">
            <p className="text-sm font-black text-white">Подбор по параметрам</p>
            <button
              className="mt-3 h-9 w-full rounded-full border border-[#22984e] text-xs text-white/68 transition hover:bg-[#22984e] hover:text-white"
              type="button"
            >
              Сбросить
            </button>
          </div>

          {filterGroups.map((group) => (
            <FilterGroup key={group.title} group={group} />
          ))}

          <section className="border-t border-white/8 pt-4">
            <button
              className="flex w-full items-center justify-between text-left text-xs font-bold text-white"
              type="button"
            >
              Имя фильтра
              <span className="text-white/45">⌄</span>
            </button>
            <button
              className="mt-4 h-10 w-full rounded-full bg-[#22984e] text-xs font-bold text-white transition hover:bg-[#2fb45e]"
              type="button"
            >
              Подобрать товар
            </button>
          </section>
        </aside>

        <div className="overflow-hidden rounded-md">
          {searchProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
