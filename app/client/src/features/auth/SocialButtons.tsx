"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SocialButtons() {
  const handleSocial = (provider: "google" | "facebook") => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirect = searchParams.get("redirect");
    let url = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`;
    if (redirect) {
      url += `?redirect=${encodeURIComponent(redirect)}`;
    }
    window.location.href = url;
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      {/* Facebook Button */}
      <Button
        onClick={() => handleSocial("facebook")}
        variant="loginFacebook"
        size="lg"
        className="w-full flex flex-wrap items-center justify-center gap-2 "
      >
        <div className="flex-shrink-0">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </div>

        <span className="font-medium whitespace-nowrap font-semibold">
          Continue with Facebook
        </span>
      </Button>

      {/* Google Button */}
      <Button
        onClick={() => handleSocial("google")}
        variant="loginGoogle"
        size="lg"
        className="w-full"
      >
        <div className="flex-shrink-0"></div>
        <Image src="/google-logo.png" width={20} height={20} alt="Google" />
        <span className="font-medium whitespace-nowrap font-semibold">
          Continue with Google
        </span>
      </Button>
    </div>
  );
}
