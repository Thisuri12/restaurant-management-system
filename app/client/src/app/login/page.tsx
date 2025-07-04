import AuthButtons from "@/features/auth/AuthButtons";
import SocialButtons from "@/features/auth/SocialButtons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up or Login",
  description:
    "Sign in to your Deliveroo account to order food from your favorite restaurants",
};

export default function LoginPage() {
  return (
    <div className="max-w-lg mx-auto mt-20 p-4 space-y-6 font-plex bg-white dark:bg-gray-900 rounded">
      <h2 className="text-xl font-bold text-left font-sans text-gray-900 dark:text-gray-100">
        Sign up or log in
      </h2>
      <SocialButtons />
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            or
          </span>
        </div>
      </div>
      <AuthButtons />
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-300 text-left">
        By continuing you agree to our{" "}
        <a
          href="https://deliveroo.co.uk/legal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 underline"
        >
          T&Cs
        </a>
        . Please also check out our{" "}
        <a
          href="https://deliveroo.co.uk/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 underline"
        >
          Privacy Policy
        </a>
        . We use your data to offer you a personalized experience and to better
        understand and improve our services.{" "}
        <a
          href="https://deliveroo.co.uk/privacy#use-of-your-information"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 underline"
        >
          For more information see here
        </a>
        .
      </div>
    </div>
  );
}
