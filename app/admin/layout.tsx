"use client";

import { usePathname } from "next/navigation";
import VerticalLayout from "@/components/layout/vertical-layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin/auth")) {
    return <>{children}</>;
  }

  return <VerticalLayout>{children}</VerticalLayout>;
}
