"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";

export default function SocialCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const userStr = searchParams.get("user");

    if (accessToken && refreshToken && userStr) {
      const user = JSON.parse(userStr);
      login({ user, accessToken, refreshToken });
      router.replace("/protected");
    } else {
      router.replace("/login");
    }
  }, [searchParams, login, router]);

  return (
    <div className="text-center py-8">Logging you in via social login...</div>
  );
}
