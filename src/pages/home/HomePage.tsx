import {
  HeroSection,
  HowItWorksSection,
  MarketplacesStrip,
  PageHeader,
} from '../../widgets/home-page';
import { PageFooter } from '../../widgets/page-footer';

export const HomePage = () => {
  return (
    <main className="min-h-screen bg-[var(--color-page)] text-[var(--color-text)]">
      <div className="flex min-h-screen w-full flex-col">
        <PageHeader />
        <HeroSection />
        <MarketplacesStrip />
        <HowItWorksSection />
        <PageFooter />
      </div>
    </main>
  );
};
