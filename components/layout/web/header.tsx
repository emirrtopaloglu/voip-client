import { Button } from "@/components/ui/button";
import Link from "next/link";

type MenuItemProps = {
  children: React.ReactNode;
  href: string;
};

function MenuItem({ children, href }: MenuItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="font-semibold text-stone-700 py-8 px-4 flex items-center bg-white hover:bg-stone-50 duration-200 text-sm"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Header() {
  const menus = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Services", href: "/services" },
  ];

  return (
    <div className="flex justify-between items-center container mx-auto">
      <div className="flex items-center">
        <img
          src="https://ehya.designspace.io/assets/images/logo.svg"
          className="h-7"
        />
      </div>
      <div className="flex items-center space-x-4">
        <ul className="flex items-center space-x-4">
          {menus.map((menu, index) => (
            <MenuItem key={index} href={menu.href}>
              {menu.title}
            </MenuItem>
          ))}
        </ul>
        <Button variant="outline">Login</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  );
}
