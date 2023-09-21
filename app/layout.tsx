import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import WebLayout from "@/components/layout/web/web-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voip",
  description: "Customer Relationship Management for Voip",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <TooltipProvider delayDuration={200} skipDelayDuration={200}>
          <WebLayout>{children}</WebLayout>
        </TooltipProvider>
      </body>
    </html>
  );
}
