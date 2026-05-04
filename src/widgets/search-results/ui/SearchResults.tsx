import type { SearchProduct } from '../model/types';
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

const formatProductMeta = (product: SearchProduct) => {
    return [product.brand, product.category, product.subcategory]
        .filter((item): item is string => item != null && item !== '')
        .join(' • ');
};

const formatRating = (value: number | null) => {
    if (value == null) {
        return null;
    }

    return value.toFixed(1);
};

const ProductImage = ({ product }: { product: SearchProduct }) => {
    if (product.imageLink) {
        return (
            <div className="flex h-full min-h-[180px] items-center justify-center overflow-hidden rounded-md bg-[#f4f4f4] shadow-inner">
                <img
                    alt={product.name}
                    className="h-full max-h-[220px] w-full object-contain"
                    loading="lazy"
                    src={product.imageLink}
                />
            </div>
        );
    }

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

const formatSliderValue = (value: number, suffix = '') => {
    return `${value}${suffix}`;
};

const ProductCard = ({ product }: { product: SearchProduct }) => {
    const productMeta = formatProductMeta(product);
    const rating = formatRating(product.rating);
    const sellerRating = formatRating(product.sellerRating);
    const hasOldPrice =
        product.costWithDiscount !== '—' && product.costWithDiscount !== product.cost;

    return (
        <article
            className="grid gap-4 bg-[#202020] p-4 last:border-b-0 md:grid-cols-[170px_1fr] lg:grid-cols-[190px_1fr_300px] lg:p-5"
            data-id="search-product-card"
        >
            <ProductImage product={product} />

            <div className="min-w-0">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-black leading-tight text-white lg:text-3xl">
                        {product.name}
                    </h2>

                    {productMeta ? (
                        <p className="text-sm font-medium text-white/55">{productMeta}</p>
                    ) : null}
                </div>

                <dl className="mt-4 grid gap-3 text-sm text-white/78 sm:grid-cols-2">
                    <div>
                        <dt className="text-white/42">Бренд</dt>
                        <dd className="mt-1 font-semibold text-white">
                            {product.brand ?? 'Не указан'}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-white/42">Продавец</dt>
                        <dd className="mt-1 font-semibold text-white">
                            {product.seller ?? 'Не указан'}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-white/42">Рейтинг товара</dt>
                        <dd className="mt-1 font-semibold text-white">
                            {rating ? `${rating} / 5` : 'Нет данных'}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-white/42">Рейтинг продавца</dt>
                        <dd className="mt-1 font-semibold text-white">
                            {sellerRating ? `${sellerRating} / 5` : 'Нет данных'}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-white/42">Отзывы</dt>
                        <dd className="mt-1 font-semibold text-white">
                            {product.reviews ?? 'Нет данных'}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-white/42">Остаток</dt>
                        <dd className="mt-1 font-semibold text-white">
                            {product.remaining ?? 'Нет данных'}
                        </dd>
                    </div>
                </dl>
            </div>

            <aside className="bg-[#191919] p-4 lg:-my-5 lg:-mr-5 lg:flex lg:flex-col lg:justify-center lg:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/40">
                    Цена
                </p>
                <p className="mt-3 text-3xl font-black text-white lg:text-4xl">
                    {product.cost} ₽
                </p>

                {hasOldPrice ? (
                    <p className="mt-2 text-sm text-white/40 line-through">
                        {product.costWithDiscount} ₽
                    </p>
                ) : null}

                <div className="mt-6 space-y-2 text-sm text-white/75">
                    <p>Артикул: {product.id}</p>
                </div>

                <a
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-[#22984e] px-5 text-sm font-bold text-white transition hover:bg-[#22984e]"
                    href={product.link}
                    rel="noreferrer"
                    target="_blank"
                >
                    Открыть товар
                </a>
            </aside>
        </article>
    );
};

export const SearchResults = ({ query }: SearchResultsProps) => {
    const {
        appliedFilters,
        draftFilters,
        errorMessage,
        handleApplyFilters,
        handleBack,
        handleFilterValueChange,
        handleOrderChange,
        handleResetFilters,
        handleSearchChange,
        handleSortChange,
        handleSubmit,
        isLoading,
        isPolling,
        products,
        searchValue,
    } = useSearchResults({
        query,
    });

    const hasResults = products.length > 0;
    const shouldShowEmptyState =
        query !== '' && !isLoading && !isPolling && !errorMessage && !hasResults;

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
                className="mt-5 grid gap-3 lg:grid-cols-[170px_minmax(280px,1fr)_160px_160px]"
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

                <label className="sr-only" htmlFor="search-results-sort">
                    Сортировка результатов
                </label>
                <select
                    className="h-11 rounded-md border border-[#22984e] bg-transparent px-3 text-[11px] font-bold text-white/70 outline-none transition hover:bg-[#22984e] hover:text-white"
                    id="search-results-sort"
                    onChange={handleSortChange}
                    value={draftFilters.sortBy ?? ''}
                >
                    <option value="">Сортировка: без сортировки</option>
                    <option value="price">Сортировка: по цене</option>
                    <option value="rating">Сортировка: по рейтингу</option>
                    <option value="reviews">Сортировка: по отзывам</option>
                </select>

                <label className="sr-only" htmlFor="search-results-order">
                    Порядок сортировки по цене
                </label>
                <select
                    className="h-11 rounded-md border border-[#22984e] bg-transparent px-3 text-[11px] font-bold text-white/70 outline-none transition hover:bg-[#22984e] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={draftFilters.sortBy !== 'price'}
                    id="search-results-order"
                    onChange={handleOrderChange}
                    value={draftFilters.orderBy}
                >
                    <option value="asc">Цена: по возрастанию</option>
                    <option value="desc">Цена: по убыванию</option>
                </select>
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
                            onClick={handleResetFilters}
                            type="button"
                        >
                            Сбросить
                        </button>
                    </div>

                    <section className="border-t border-white/8 py-4 first:border-t-0 first:pt-0">
                        <div className="flex items-center justify-between gap-3 text-xs font-bold text-white">
                            <span>Минимум отзывов</span>
                            <span className="text-white/55">
                                {formatSliderValue(draftFilters.minReviews)}
                            </span>
                        </div>
                        <input
                            className="mt-4 h-2 w-full cursor-pointer accent-[#22984e]"
                            max={1000}
                            min={0}
                            onChange={(event) => handleFilterValueChange('minReviews', event)}
                            step={5}
                            type="range"
                            value={draftFilters.minReviews}
                        />
                    </section>

                    <section className="border-t border-white/8 py-4">
                        <div className="flex items-center justify-between gap-3 text-xs font-bold text-white">
                            <span>Минимальная цена</span>
                            <span className="text-white/55">
                                {formatSliderValue(draftFilters.minPrice, ' ₽')}
                            </span>
                        </div>
                        <input
                            className="mt-4 h-2 w-full cursor-pointer accent-[#22984e]"
                            max={200000}
                            min={0}
                            onChange={(event) => handleFilterValueChange('minPrice', event)}
                            step={1000}
                            type="range"
                            value={draftFilters.minPrice}
                        />
                    </section>

                    <section className="border-t border-white/8 py-4">
                        <div className="flex items-center justify-between gap-3 text-xs font-bold text-white">
                            <span>Минимальный рейтинг</span>
                            <span className="text-white/55">
                                {formatSliderValue(draftFilters.minRating)}
                            </span>
                        </div>
                        <input
                            className="mt-4 h-2 w-full cursor-pointer accent-[#22984e]"
                            max={5}
                            min={0}
                            onChange={(event) => handleFilterValueChange('minRating', event)}
                            step={0.1}
                            type="range"
                            value={draftFilters.minRating}
                        />
                    </section>

                    <section className="border-t border-white/8 pt-4">
                        <div className="space-y-2 text-[11px] text-white/45">
                            <p>Активные фильтры применяются к серверному запросу.</p>
                            <p>
                                Сейчас: цена от {appliedFilters.minPrice} ₽, отзывы от{' '}
                                {appliedFilters.minReviews}, рейтинг от{' '}
                                {appliedFilters.minRating.toFixed(1)}
                            </p>
                        </div>
                        <button
                            className="mt-4 h-10 w-full rounded-full bg-[#22984e] text-xs font-bold text-white transition hover:bg-[#2fb45e]"
                            onClick={handleApplyFilters}
                            type="button"
                        >
                            Подобрать товар
                        </button>
                    </section>
                </aside>

                <div className="overflow-hidden rounded-md">
                    {isLoading ? (
                        <div className="rounded-md bg-[#202020] px-6 py-10 text-sm text-white/72">
                            Выполняем поиск товаров...
                        </div>
                    ) : null}

                    {isPolling ? (
                        <div className="rounded-md bg-[#202020] px-6 py-10 text-sm text-white/72">
                            Поиск ещё выполняется на стороне сервера. Обновляем результаты...
                        </div>
                    ) : null}

                    {errorMessage ? (
                        <div className="rounded-md bg-[#202020] px-6 py-10 text-sm text-[#ff8c82]">
                            {errorMessage}
                        </div>
                    ) : null}

                    {shouldShowEmptyState ? (
                        <div className="rounded-md bg-[#202020] px-6 py-10 text-sm text-white/72">
                            По вашему запросу ничего не найдено.
                        </div>
                    ) : null}

                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};
