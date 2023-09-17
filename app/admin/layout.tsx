import LayoutProvider from "@/context/layout-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
