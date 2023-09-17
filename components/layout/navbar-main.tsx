"use client";

import { Bell, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";

export default function NavbarMain() {
  return (
    <section
      id="app-header"
      className="bg-white py-2 px-4 flex items-center justify-between w-full h-16 border-b"
    >
      <div>
        <h6 className="text-xs bg-yellow-50 py-2 px-4 text-stone-600">
          <Sparkles size={16} className="inline-block mr-2 text-yellow-500" />
          <span className="font-semibold">Produs</span> is in beta. Please
          report any bugs or issues.
        </h6>
      </div>
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-4">
            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-end flex-wrap">
                <span className="font-semibold text-stone-700 text-sm">
                  John Doe
                </span>
                <span className="text-stone-500 text-xs">Admin</span>
              </div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
