"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import WebLayout from "@/components/layout/web/web-layout";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/store/provider";
import "@/lib/i18n";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          <TooltipProvider delayDuration={200} skipDelayDuration={200}>
            <WebLayout>
              {children}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 2000
                }}
              />
            </WebLayout>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
