import { footerHelp, footerNavigation } from '../model/content';

export const PageFooter = () => {
  return (
    <footer className="mt-auto w-full bg-[var(--color-footer)] px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr]">
          <div className="space-y-5">
            <a className="flex items-center gap-3" href="/">
              <img
                alt="Выгодный взгляд"
                className="h-12 w-auto"
                src="/static/logo.svg"
              />
            </a>

            <p className="max-w-[260px] text-sm leading-6 text-white/45">
              ООО «ВВ глаз»
              <br />
              Мы знаем все ответы на запросы
            </p>

            <p className="max-w-[320px] text-xs leading-5 text-white/30">
              Сервис не является ни продавцом, ни маркетплейсом. Ozon, Wildberries,
              Яндекс Маркет, AliExpress упомянуты как источники сравнения.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.18em] text-white/35 uppercase">
              Навигация
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/62">
              {footerNavigation.map((item) => (
                <li key={item}>
                  <a className="transition hover:text-white" href="/">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.18em] text-white/35 uppercase">
              Нужна помощь?
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/62">
              {footerHelp.map((item) => (
                <li key={item}>
                  <a className="transition hover:text-white" href="/">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.18em] text-white/35 uppercase">
                Остались вопросы?
              </h3>
              <p className="mt-4 max-w-[300px] text-sm leading-6 text-white/45">
                Оставьте заявку и получите бесплатную консультацию от сервиса.
              </p>
            </div>

            <form className="space-y-3">
              <input
                className="w-full border-b border-white/18 bg-transparent pb-2 text-sm text-white outline-none placeholder:text-white/28 focus:border-lime-300"
                placeholder="Ваш email"
                type="email"
              />
              <input
                className="w-full border-b border-white/18 bg-transparent pb-2 text-sm text-white outline-none placeholder:text-white/28 focus:border-lime-300"
                placeholder="Номер телефона"
                type="tel"
              />
              <label className="flex items-center gap-2 text-[11px] leading-4 text-white/32">
                <input
                  className="h-3.5 w-3.5 rounded border-white/25 bg-transparent"
                  type="checkbox"
                />
                Нажимая на кнопку вы соглашаетесь с политикой конфиденциальности
              </label>
              <div className="flex items-center justify-between gap-4 pt-2">
                <div className="flex gap-2 text-white/55">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15">
                    vk
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15">
                    tg
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15">
                    ok
                  </span>
                </div>
                <button
                  className="rounded-full border border-white/15 px-5 py-2 text-xs font-bold tracking-[0.14em] text-white uppercase transition hover:bg-white hover:text-black"
                  type="submit"
                >
                  Отправить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};
