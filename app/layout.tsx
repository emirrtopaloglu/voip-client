import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import LayoutProvider from "@/context/layout-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Produs",
  description: "Product Management Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider delayDuration={200} skipDelayDuration={200}>
          <LayoutProvider>{children}</LayoutProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
