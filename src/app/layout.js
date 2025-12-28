import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
// import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { CurrencyProvider } from "@/contexts/currency-context";
import { botAj } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Capitize",
  description: "AI-Powered Financial Management Platform - Take control of your finances with intelligence",
};

export default async function RootLayout({ children }) {
  const req = await request();
  const decision = await botAj.protect(req);

  if (decision.isDenied()) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
              <p className="text-gray-600">
                {decision.reason.isBot()
                  ? "Bot activity detected."
                  : "Your request has been blocked."}
              </p>
            </div>
          </div>
        </body>
      </html>
    );
  }

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
