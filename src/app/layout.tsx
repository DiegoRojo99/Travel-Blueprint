import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/nav/NavBar";

import '@fortawesome/fontawesome-svg-core/styles.css';
import "./globals.css";
import FooterContent from "@/components/footer/FooterContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel Blueprint",
  description: "Plan your perfect trip effortlessly. Explore, organize, and go!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col`} >
        <Navbar />
        <div className="dark:bg-gray-900 flex-grow">
          {children}
        </div>
        <FooterContent />
      </body>
    </html>
  );
}
