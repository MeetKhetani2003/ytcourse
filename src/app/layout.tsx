import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Faceless USA YouTube Channel Masterclass | Build A High-Yield Cash Cow",
  description: "Learn the step-by-step system to build, scale, and monetize faceless YouTube channels targeting high-paying USA audiences using advanced AI tools.",
  metadataBase: new URL("https://faceless-mastery.com"),
  openGraph: {
    title: "Faceless USA YouTube Channel Masterclass",
    description: "The complete blueprint to generate high-CPM dollar revenue with faceless channels.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF9F6] text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
