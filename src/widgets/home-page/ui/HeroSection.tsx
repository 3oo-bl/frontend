import { priorities } from '../model/content';

export const HeroSection = () => {
  return (
    <section className="relative px-4 pb-14 pt-16 sm:px-8 sm:pb-18 lg:px-10 lg:pt-22">
      <div className="absolute inset-x-10 top-0 h-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_70%)] blur-3xl" />
      <div className="relative mx-auto flex max-w-[980px] flex-col items-center text-center">
        <h1 className="max-w-[860px] text-4xl leading-none font-black tracking-[-0.04em] text-white sm:text-6xl lg:text-[72px]">
          Смотри на мир с выгодой
        </h1>

        <div className="mt-8 flex w-full flex-wrap justify-center gap-3">
          {priorities.map((priority) => (
            <button
              key={priority}
              className="rounded-2xl border border-white/6 bg-[var(--color-panel)] px-5 py-3 text-sm font-semibold text-white/78 transition hover:-translate-y-0.5 hover:bg-white/9 hover:text-white"
              type="button"
            >
              {priority}
            </button>
          ))}
        </div>

        <form className="mt-8 flex w-full max-w-[900px] flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="product-query">
            Поиск товара
          </label>
          <input
            className="h-14 flex-1 rounded-2xl border border-black/15 bg-white px-5 text-base text-[#2f2f2f] outline-none ring-0 placeholder:text-[#a3a3a3] focus:border-lime-300"
            id="product-query"
            placeholder="Введите поисковый запрос или артикул (например, товара WB/Ozon)"
            type="text"
          />
          <button
            className="h-14 rounded-2xl bg-[var(--color-panel)] px-7 text-sm font-semibold text-white transition hover:bg-black"
            type="submit"
          >
            Найти товар
          </button>
        </form>
      </div>
    </section>
  );
};
