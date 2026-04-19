import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authorizeClient } from '../../app/auth';
import { PageFooter } from '../../widgets/page-footer';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authorizeClient();
    navigate('/profile', { replace: true });
  };

  return (
    <main className="min-h-screen bg-[var(--color-page)] text-white">
      <div className="flex min-h-screen flex-col">
        <section className="flex-1">
          <div className="grid min-h-[720px] w-full bg-[#1f1f1f] lg:grid-cols-[1fr_1fr]">
            <div className="flex items-center px-8 py-12 sm:px-12 lg:px-16">
              <div className="w-full max-w-[420px]">
                <img
                  alt="Выгодный взгляд"
                  className="h-14 w-auto"
                  src="/static/logo.svg"
                />

                <div className="mt-10">
                  <h1 className="text-4xl font-black tracking-[-0.04em] text-white">
                    Регистрация
                  </h1>
                  <p className="mt-4 max-w-[320px] text-sm leading-6 text-white/50">
                    Создайте учетную запись, чтобы сравнивать цены и сохранять историю
                    поиска
                  </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label
                      className="mb-2 block text-xs font-semibold tracking-[0.04em] text-white/70"
                      htmlFor="full-name"
                    >
                      Введите полное имя
                    </label>
                    <input
                      className="h-12 w-full rounded-full border border-black/15 bg-white px-5 text-sm text-[#2f2f2f] outline-none placeholder:text-[#9c9c9c] focus:border-lime-300"
                      id="full-name"
                      placeholder="Иван Иванов"
                      type="text"
                    />
                  </div>

                  <div>
                    <label
                      className="mb-2 block text-xs font-semibold tracking-[0.04em] text-white/70"
                      htmlFor="email"
                    >
                      Введите адрес электронной почты
                    </label>
                    <input
                      className="h-12 w-full rounded-full border border-black/15 bg-white px-5 text-sm text-[#2f2f2f] outline-none placeholder:text-[#9c9c9c] focus:border-lime-300"
                      id="email"
                      placeholder="vocalovdev@gmail.com"
                      type="email"
                    />
                  </div>

                  <div>
                    <label
                      className="mb-2 block text-xs font-semibold tracking-[0.04em] text-white/70"
                      htmlFor="password"
                    >
                      Введите пароль
                    </label>
                    <input
                      className="h-12 w-full rounded-full border border-black/15 bg-white px-5 text-sm text-[#2f2f2f] outline-none placeholder:text-[#9c9c9c] focus:border-lime-300"
                      id="password"
                      placeholder="••••"
                      type="password"
                    />
                  </div>

                  <div>
                    <label
                      className="mb-2 block text-xs font-semibold tracking-[0.04em] text-white/70"
                      htmlFor="confirm-password"
                    >
                      Подтвердите пароль
                    </label>
                    <input
                      className="h-12 w-full rounded-full border border-black/15 bg-white px-5 text-sm text-[#2f2f2f] outline-none placeholder:text-[#9c9c9c] focus:border-lime-300"
                      id="confirm-password"
                      placeholder="••••"
                      type="password"
                    />
                  </div>

                  <button
                    className="flex h-12 w-full items-center justify-center rounded-full border border-[#18693a] text-sm font-semibold text-white transition hover:bg-[#18693a]"
                    type="submit"
                  >
                    Зарегистрироваться
                  </button>

                  <Link
                    className="inline-block text-xs text-white/42 transition hover:text-white"
                    to="/login"
                  >
                    Уже есть аккаунт?
                  </Link>
                </form>
              </div>
            </div>

            <div className="relative hidden min-h-[720px] bg-repeat-x lg:block">
              <img alt="" className="" src="/static/cool-lines.svg" />
            </div>
          </div>
        </section>

        <PageFooter />
      </div>
    </main>
  );
};
