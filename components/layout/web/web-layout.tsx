"use client";
import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return children;

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
