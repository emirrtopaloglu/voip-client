import RegisterForm from "@/views/auth/register-form";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register - Voip"
};

export default function RegisterPage() {
  return (
    <div className="w-[360px] space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900 text-center">
          Create your account
        </h1>
        <p className="text-sm text-stone-400 text-center">
          Enter your email and create your account.
        </p>
      </div>
      <RegisterForm />
      <p className="text-sm text-stone-400 text-center">
        Already have account?{" "}
        <Link href="/admin/auth/login" className="text-stone-900 font-medium">
          Login
        </Link>
      </p>
    </div>
  );
}
