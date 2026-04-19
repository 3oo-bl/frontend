import { Link } from 'react-router-dom';

export const PageHeader = () => {
  return (
    <header className="w-full px-4 pt-5 sm:px-8 lg:px-10">
      <div className="w-full px-4 py-3 sm:px-6">
        <div className="flex w-full items-center justify-between">
          <Link className="flex items-center gap-3" to="/">
            <img
              alt="Выгодный взгляд"
              className="h-10 w-auto sm:h-11"
              src="/static/logo.svg"
            />
          </Link>

          <nav className="flex items-center gap-8 text-sm text-white/75">
            <Link className="transition duration-300 hover:text-white" to="/profile">
              Профиль
            </Link>
            <a className="transition duration-300 hover:text-white" href="#history">
              История
            </a>
            <a className="transition duration-300 hover:text-white" href="#support">
              Поддержка
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
