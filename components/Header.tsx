import { client } from '@/lib/sanity';
import { portfolioQuery } from '@/lib/queries';
import { HeaderClient } from './HeaderClient';

export const Header = async () => {
  const portfolio = await client.fetch(portfolioQuery);

  return (
    <HeaderClient 
      title={portfolio?.title || 'My Portfolio'}
      subtitle={portfolio?.subtitle || 'Showcasing creative projects'}
      titleFont={portfolio?.titleFont}
    />
  );
};
