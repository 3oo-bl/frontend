import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '@/widgets/home-page';
import { PageFooter } from '@/widgets/page-footer';
import { SearchResults } from '@/widgets/search-results';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';

  return (
    <main className="min-h-screen bg-[#191919] text-white">
      <div className="flex min-h-screen flex-col">
        <PageHeader />
        <SearchResults query={query} />
        <PageFooter />
      </div>
    </main>
  );
};
