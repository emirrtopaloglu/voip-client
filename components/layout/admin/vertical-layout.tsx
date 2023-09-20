import NavbarMain from "./navbar-main";
import SidebarLeft from "./sidebar-left";

export default function VerticalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[calc(100%-256px)] ml-64 h-screen">
      <SidebarLeft />
      <main>
        <NavbarMain />
        <section id="app-content" className="p-4">
          {children}
        </section>
      </main>
    </div>
  );
}
