import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAuth(cookies: any) {
  if (cookies.has("accessToken")) {
    return true;
  }

  return false;
}

export const isServer = typeof window === "undefined";
