import {
  FileText,
  Grip,
  Home,
  Layers,
  ListTodo,
  MenuSquare,
  MessageSquarePlus,
  PlusSquare,
  ScrollText,
  Settings,
  ShieldCheck,
  User2,
} from "lucide-react";
import Link from "next/link";

export default function SidebarLeft() {
  return (
    <section
      id="sidebar-left"
      className="w-64 min-h-screen h-screen fixed top-0 left-0 border-r p-4"
    >
      <div
        id="sidebar-header"
        className="flex flex-row items-center space-x-2 mb-4"
      >
        <Grip
          size={24}
          className="text-stone-700 border w-10 h-10 p-2 cursor-pointer rounded"
        />
        <span className="text-stone-900 font-medium text-lg">Voip</span>
      </div>
      <div id="sidebar-inner">
        <nav>
          <ul className="space-y-2">
            <li className="block">
              <Link
                href="/admin/home"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <Home size={16} className="inline-block mr-2" />
                Home
              </Link>
            </li>
            <li className="block">
              <Link
                href="/admin/posts"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <PlusSquare size={16} className="inline-block mr-2" />
                Posts
              </Link>
            </li>
            <li className="block">
              <Link
                href="/admin/pages"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <Layers size={16} className="inline-block mr-2" />
                Pages
              </Link>
            </li>
            <li className="block">
              <Link
                href="/admin/menus"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <MenuSquare size={16} className="inline-block mr-2" />
                Menus
              </Link>
            </li>
            <li className="block">
              <Link
                href="/admin/roles"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <ShieldCheck size={16} className="inline-block mr-2" />
                Roles
              </Link>
            </li>
            <li className="block">
              <Link
                href="/admin/settings"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <Settings size={16} className="inline-block mr-2" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
