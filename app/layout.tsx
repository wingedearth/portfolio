import type { Metadata } from "next";
import { Raleway, Montserrat, Libre_Bodoni, Inter, Open_Sans, Roboto } from "next/font/google";
import "./globals.css";
import { client } from '@/lib/sanity';
import { portfolioQuery } from '@/lib/queries';
import { FontProvider } from '@/components/FontProvider';

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const libreBodoni = Libre_Bodoni({
  variable: "--font-libre-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ['normal', 'italic'],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Showcasing creative projects and design work",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const portfolio = await client.fetch(portfolioQuery);

  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${montserrat.variable} ${libreBodoni.variable} ${inter.variable} ${openSans.variable} ${roboto.variable} font-sans antialiased`}
      >
        <FontProvider 
          primaryFont={portfolio?.primaryFont} 
          secondaryFont={portfolio?.secondaryFont} 
        />
        {children}
      </body>
    </html>
  );
}
