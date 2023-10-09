"use client";

import { Bell, LogOut, Sparkles, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import axios from "@/lib/axios";
import { useAppSelector } from "@/hooks/useRedux";

export default function NavbarMain() {
  const { full_name, company_name } = useAppSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      if (res.status == 200) {
        window?.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      id="app-header"
      className="bg-white py-2 px-4 flex items-center justify-between w-full h-16 border-b"
    >
      <div className="bg-blue-50 py-2 px-4">
        <p className="text-xs text-stone-600">
          <Sparkles size={16} className="inline-block mr-2 text-blue-500" />
          Welcome to <span className="font-bold">Voip</span> App.
        </p>
      </div>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-4">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-end flex-wrap">
                <span className="font-semibold text-stone-700 text-sm">
                  {full_name}
                </span>
                <span className="text-stone-500 text-xs">{company_name}</span>
              </div>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>
                  <User size={16} />
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuItem className="!text-red-500" onClick={handleLogout}>
              <LogOut size={16} className="inline-block mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
