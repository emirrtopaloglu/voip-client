import {
  FileText,
  Grip,
  Home,
  ListTodo,
  MessageSquarePlus,
  ScrollText,
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
                href="/dashboard"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <Home size={16} className="inline-block mr-2" />
                Dashboard
              </Link>
            </li>
            <li className="block">
              <Link
                href="/tasks"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <ListTodo size={16} className="inline-block mr-2" />
                Tasks
              </Link>
            </li>
            <li className="block">
              <Link
                href="/tasks"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <User2 size={16} className="inline-block mr-2" />
                Customers
              </Link>
            </li>
            <li className="block">
              <Link
                href="/feedback"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <MessageSquarePlus size={16} className="inline-block mr-2" />
                Feedback
              </Link>
            </li>
            <li className="block">
              <Link
                href="/changelog"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <ScrollText size={16} className="inline-block mr-2" />
                Changelog
              </Link>
            </li>
            <li className="block">
              <Link
                href="/documentation"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <FileText size={16} className="inline-block mr-2" />
                Documentation
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
