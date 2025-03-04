import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { CartProvider } from "@/components/cart-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Origami Importados - Traemos lo mejor del mundo a tus manos.",
  description: "Productos Importados con Garantía.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen bg-background">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}

import "./globals.css";
