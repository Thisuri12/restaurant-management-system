"use Client";

import AuthForm from "@/components/auth/AuthForm";
import SocialButtons from "@/components/auth/SocialButtons";

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto mt-20 p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <AuthForm type="login" />
      <SocialButtons />
    </div>
  );
}
