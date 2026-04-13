import { infoCards } from '../model/content';

export const HowItWorksSection = () => {
  return (
    <section className="px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1280px] rounded-[28px] border border-white/6 bg-black/10 p-3 sm:p-5">
        <div className="rounded-[24px] bg-[var(--color-card)] px-5 py-7 text-center text-xl font-black tracking-[-0.03em] text-[#191919] sm:text-[28px]">
          ОСНОВНАЯ ИНФА КАК ЭТО РАБОТАЕТ
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {infoCards.map((card) => (
            <article
              key={card.title}
              className="flex min-h-[320px] flex-col justify-between rounded-[24px] bg-[var(--color-card)] p-6 text-[#1f1f1f] sm:min-h-[380px] lg:min-h-[430px]"
            >
              <div className="space-y-4">
                <span className="inline-flex rounded-full bg-[#1e1e1e] px-3 py-1 text-xs font-bold tracking-[0.16em] text-white/70 uppercase">
                  Этап
                </span>
                <h2 className="max-w-[280px] text-2xl leading-tight font-black tracking-[-0.04em]">
                  {card.title}
                </h2>
              </div>

              <p className="max-w-[290px] text-base leading-7 text-[#4d4d4d]">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
