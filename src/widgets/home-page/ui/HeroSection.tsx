import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { priorities } from '../model/content';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchValue.trim();

    if (query === '') {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="relative px-4 pb-14 pt-16 sm:px-8 sm:pb-18 lg:px-10 lg:pt-22">
      <div className="absolute inset-x-10 top-0 h-72 rounded-full bg-[radial-gradient(circle,rgba(34,152,78,0.24)_0%,rgba(34,152,78,0)_70%)] blur-3xl" />
      <div className="relative mx-auto flex max-w-[980px] flex-col items-center text-center">
        <h1 className="max-w-[860px] text-4xl leading-none font-black tracking-[-0.04em] text-white sm:text-6xl lg:text-[72px]">
          Смотри на мир с выгодой
        </h1>

        <div className="mt-8 flex w-full flex-wrap justify-center gap-3">
          {priorities.map((priority) => (
            <button
              key={priority}
              className="rounded-2xl border border-white/8 bg-[#202020] px-5 py-3 text-sm font-semibold text-white/78 transition hover:-translate-y-0.5 hover:border-[#22984e] hover:bg-[#1f1f1f] hover:text-white"
              type="button"
            >
              {priority}
            </button>
          ))}
        </div>

        <form
          className="mt-8 flex w-full max-w-[900px] flex-col gap-3 sm:flex-row"
          onSubmit={handleSubmit}
        >
          <label className="sr-only" htmlFor="product-query">
            Поиск товара
          </label>
          <input
            className="h-14 flex-1 rounded-2xl border border-white/10 bg-[#202020] px-5 text-base text-white outline-none ring-0 placeholder:text-white/28 focus:border-[#22984e]"
            id="product-query"
            onChange={handleSearchChange}
            placeholder="Введите поисковый запрос или артикул (например, товара WB/Ozon)"
            type="text"
            value={searchValue}
          />
          <button
            className="h-14 rounded-2xl border border-[#22984e] bg-[#22984e] px-7 text-sm font-semibold text-white transition hover:bg-[#1c7b3f]"
            type="submit"
          >
            Найти товар
          </button>
        </form>
      </div>
    </section>
  );
};
