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
    const redirect = searchParams.get("redirect") || "/";

    if (accessToken && refreshToken && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        login({ user, accessToken, refreshToken });
        router.replace(redirect);
      } catch (err) {
        console.error("Invalid user data:", err);
        router.replace("/login");
      }
    } else {
      router.replace("/login");
    }
  }, [searchParams, login, router]);

  return (
    <div className="text-center py-8">Logging you in via social login...</div>
  );
}
