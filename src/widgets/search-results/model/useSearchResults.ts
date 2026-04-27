import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UseSearchResultsParams = {
  query: string;
};

export const useSearchResults = ({ query }: UseSearchResultsParams) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextQuery = searchValue.trim();

    if (nextQuery === '') {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(nextQuery)}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  return {
    handleBack,
    handleSearchChange,
    handleSubmit,
    searchValue,
  };
};
