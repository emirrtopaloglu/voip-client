export default function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-stone-50 py-12 min-h-[150px] text-center flex items-center flex-col justify-center">
      <div className="container space-y-4 flex items-center flex-col justify-center">{children}</div>
    </div>
  );
}
