"use client";

import { usePathname } from "next/navigation";
import VerticalLayout from "@/components/layout/admin/vertical-layout";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useAppDispatch } from "@/hooks/useRedux";
import { type AuthState, login } from "@/views/auth/authSlice";
import Loading from "./loading";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);

  const getRefreshToken = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/auth/refresh-token");
      if (res.status == 200) {
        const decoded_token: AuthState = jwtDecode(res.data.access_token);
        dispatch(login(decoded_token));
      } else {
        await axios.get("/api/auth/logout");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRefreshToken();

    return () => {
      setLoading(false);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (pathname.startsWith("/admin/auth")) {
    return <>{children}</>;
  }

  return <VerticalLayout>{children}</VerticalLayout>;
}
