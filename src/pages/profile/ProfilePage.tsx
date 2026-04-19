import { useNavigate } from 'react-router-dom';
import { logoutClient } from '../../app/auth';

export const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutClient();
    navigate('/login', { replace: true });
  };

  return (
    <main className="min-h-screen bg-[var(--color-page)] px-4 py-8 text-white sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center">
        <div className="w-full rounded-[32px] border border-white/10 bg-[#1f1f1f] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:p-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/45">
                Профиль клиента
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-white">
                Добро пожаловать
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
                Это защищенная страница клиента. Если пользователь не авторизован,
                роутер автоматически отправляет его на страницу входа.
              </p>
            </div>

            <button
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#18693a] px-6 text-sm font-semibold text-white transition hover:bg-[#18693a]"
              onClick={handleLogout}
              type="button"
            >
              Выйти
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
