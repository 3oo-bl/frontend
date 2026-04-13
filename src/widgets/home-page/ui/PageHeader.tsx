export const PageHeader = () => {
  return (
    <header className="w-full px-4 pt-5 sm:px-8 lg:px-10">
      <div className="w-full px-4 py-3 sm:px-6">
        <div className="flex w-full items-center justify-between">
          <a className="flex items-center gap-3" href="/">
            <img
              alt="Выгодный взгляд"
              className="h-10 w-auto sm:h-11"
              src="/static/logo.svg"
            />
          </a>

          <nav className="flex items-center gap-8 text-sm text-white/75">
            <a className="transition duration-300 hover:text-white" href="#profile">
              Профиль
            </a>
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
