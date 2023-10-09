"use client";

import {
  FileClock,
  Grip,
  Home,
  Layers,
  MenuSquare,
  PlusSquare,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function SidebarLeft() {
  const { t } = useTranslation();

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
                {t("menu.home")}
              </Link>
            </li>
            <li className="block">
              <Link
                href="/admin/users"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <Users size={16} className="inline-block mr-2" />
                {t("menu.users")}
              </Link>
            </li>
            <li className="block">
              <Link
                href="/admin/posts"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <PlusSquare size={16} className="inline-block mr-2" />
                {t("menu.posts")}
              </Link>
            </li>
            <li className="block">
              <Link
                href="/admin/pages"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <Layers size={16} className="inline-block mr-2" />
                {t("menu.pages")}
              </Link>
            </li>
            <li className="block">
              <Link
                href="/admin/menus"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <MenuSquare size={16} className="inline-block mr-2" />
                {t("menu.menus")}
              </Link>
            </li>
            <li className="block">
              <Link
                href="/admin/roles"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <ShieldCheck size={16} className="inline-block mr-2" />
                {t("menu.roles")}
              </Link>
            </li>
            <li className="block">
              <Link
                href="/admin/logs"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <FileClock size={16} className="inline-block mr-2" />
                {t("menu.logs")}
              </Link>
            </li>
            <li className="block">
              <Link
                href="/admin/settings"
                className="text-stone-700 text-sm hover:bg-stone-100 p-2 cursor-pointer duration-200 rounded flex items-center"
              >
                <Settings size={16} className="inline-block mr-2" />
                {t("menu.settings")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
