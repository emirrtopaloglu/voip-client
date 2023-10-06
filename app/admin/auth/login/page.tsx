import { Button } from "@/components/ui/button";
import LoginForm from "@/views/auth/login-form";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login - Voip",
};

export default function LoginPage() {
  return (
    <div className="min-w-[360px] space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900 text-center">
          Welcome to Voip
        </h1>
        <p className="text-sm text-stone-400 text-center">
          Enter your email and login to your account.
        </p>
      </div>
      <LoginForm />
      <p className="text-sm text-stone-400 text-center">
        Dont have an account?{" "}
        <Link
          href="/admin/auth/register"
          className="text-stone-900 font-medium"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
