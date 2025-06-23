"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AuthButton() {
  const router = useRouter();

  const handleEmailLogin = () => {
    router.push("/email/login");
  };

  return (
    <div className="flex gap-2 mt-4">
      <Button
        variant="emailLogin"
        size="lg"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleEmailLogin}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        Continue with E-mail
      </Button>
    </div>
  );
}
