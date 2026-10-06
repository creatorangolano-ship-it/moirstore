import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { ToastContainer } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Moir Store | Roupas & Perfumes de Luxo em Luanda",
  description:
    "Boutique exclusiva de moda de luxo, vestidos, camisaria nobre e alta perfumaria de nicho em Luanda, Angola. Checkout direto para WhatsApp oficial +244 945 665 918.",
  keywords: [
    "Moir Store",
    "Luanda",
    "Angola",
    "Kwanza",
    "Roupas de Luxo",
    "Perfumes Importados",
    "Moda Feminina",
    "Moda Masculina",
    "Alta Perfumaria",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-AO">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="antialiased bg-luxury-cream text-luxury-dark min-h-screen selection:bg-luxury-gold selection:text-white">
        <StoreProvider>
          {children}
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
