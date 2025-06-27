import AuthForm from "@/features/auth/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your Deliveroo account to order food from your favorite restaurants",
};

export default function LoginPage() {
  return (
    <div className="flex items-start justify-center font-plex mt-1 mb-2">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-900 rounded shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Sign in
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            New here?{" "}
            <a
              href="/email/register"
              className="font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300"
            >
              Create an account
            </a>
          </p>
        </div>
        <AuthForm type="login" />
      </div>
    </div>
  );
}
