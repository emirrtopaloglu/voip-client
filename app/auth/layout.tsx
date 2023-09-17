import { LayoutGrid } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 w-screen h-screen">
      <div className="bg-stone-900 h-screen w-full p-10 flex flex-col justify-between text-white">
        <div className="flex items-center">
          <LayoutGrid size="24" />
          <span className="text-white text-lg font-medium ml-2">Produs</span>
        </div>
        <div>
          <p className="text-lg">
            "Great things in business are never done by one person. They’re done
            by a team of people."
            <small className="ml-2">- Steve Jobs</small>
          </p>
        </div>
      </div>
      <div className="bg-white-900 h-screen w-full p-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
