import { portfolioInfo } from '@/data/portfolio-data';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-4xl font-bold text-gray-900">{portfolioInfo.title}</h1>
        <p className="mt-2 text-gray-600">{portfolioInfo.subtitle}</p>
      </div>
    </header>
  );
};
