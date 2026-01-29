import { client } from '@/lib/sanity';
import { portfolioQuery } from '@/lib/queries';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/components/ContactSection';

const ContactPage = async () => {
  const portfolio = await client.fetch(portfolioQuery);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ContactSection portfolio={portfolio} />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
