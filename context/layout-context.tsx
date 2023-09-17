"use client";

import VerticalLayout from "@/components/layout/vertical-layout";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

type LayoutContext = {
  layout: "vertical" | "blank";
};

const Context = createContext<LayoutContext | undefined>(undefined);

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [layout, setLayout] = useState<"vertical" | "blank">("blank");

  useEffect(() => {
    if (pathname.includes("/auth/")) {
      setLayout("blank");
    } else {
      setLayout("vertical");
    }
  }, [pathname]);

  return (
    <Context.Provider value={{ layout }}>
      {layout == "vertical" && <VerticalLayout>{children}</VerticalLayout>}
      {layout == "blank" && children}
    </Context.Provider>
  );
}
