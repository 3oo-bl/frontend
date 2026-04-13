import {
  HeroSection,
  HowItWorksSection,
  MarketplacesStrip,
  PageFooter,
  PageHeader,
} from '../../widgets/home-page';

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
