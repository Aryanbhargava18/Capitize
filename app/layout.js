import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
// import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { CurrencyProvider } from "@/contexts/currency-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Capitize",
  description: "AI-Powered Financial Management Platform - Take control of your finances with intelligence",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <CurrencyProvider>
        <html lang="en">
          <head>
            <link rel="icon" href="/logo-sm.png" sizes="any" />
          </head>
          <body className={`${inter.className} flex flex-col min-h-screen`}>
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster richColors />
            {/* <Footer /> */}
          </body>
        </html>
      </CurrencyProvider>
    </ClerkProvider>
  );
}
