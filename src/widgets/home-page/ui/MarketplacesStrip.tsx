import { marketplaces } from '../model/content';

export const MarketplacesStrip = () => {
  return (
    <section className="w-full border-y border-white/6 bg-[var(--color-strip)] px-4 py-5 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {marketplaces.map((marketplace) => (
          <img
            key={marketplace.alt}
            alt={marketplace.alt}
            className={`${marketplace.className} w-auto object-contain opacity-95`}
            src={marketplace.src}
          />
        ))}
      </div>
    </section>
  );
};
