"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SocialButtons() {
  const handleSocial = (provider: "google" | "facebook") => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`;
  };

  return (
    <div className="flex gap-2 mt-4">
      <Button
        variant="outline"
        onClick={() => handleSocial("google")}
        className="w-full flex gap-2 justify-center items-center"
      >
        <Image src="/google-logo.png" width={20} height={20} alt="Google" />
        Login with Google
      </Button>
      <Button
        variant="outline"
        onClick={() => handleSocial("facebook")}
        className="w-full flex gap-2 justify-center items-center"
      >
        <Image src="/facebook-logo.png" width={20} height={20} alt="Facebook" />
        Login with Facebook
      </Button>
    </div>
  );
}
