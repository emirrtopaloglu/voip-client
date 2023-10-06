import { Suspense } from "react";
import NavbarMain from "./navbar-main";
import SidebarLeft from "./sidebar-left";
import Loading from "@/app/admin/loading";

export default function VerticalLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[calc(100%-256px)] ml-64 h-screen">
      <SidebarLeft />
      <main>
        <NavbarMain />
        <section id="app-content" className="p-4">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>
      </main>
    </div>
  );
}
