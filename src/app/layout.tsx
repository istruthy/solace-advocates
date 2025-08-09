import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FavoritesPanel } from "./components/FavoritesPanel";
import ErrorBoundary from "./components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
  favorites,
}: Readonly<{
  children: React.ReactNode;
  favorites: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <ErrorBoundary>
            <div className="w-full">{children}</div>
          </ErrorBoundary>
          {favorites && <FavoritesPanel>{favorites}</FavoritesPanel>}
        </div>
      </body>
    </html>
  );
}
