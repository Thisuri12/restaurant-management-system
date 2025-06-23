import AuthForm from "@/features/auth/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Sign up today and order food from your favorite restaurants",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-plex">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account{" "}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/email/login"
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Sign in
            </a>
          </p>
        </div>
        <AuthForm type="register" />
      </div>
    </div>
  );
}
