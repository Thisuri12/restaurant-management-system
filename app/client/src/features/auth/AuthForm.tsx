"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/stores/auth";

interface Props {
  type: "login" | "register";
}

type AuthFormValues = {
  full_name?: string;
  email: string;
  password: string;
};

export default function AuthForm({ type }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const login = useAuthStore((s) => s.login);

  const [apiError, setApiError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    setApiError("");

    try {
      const endpoint = type === "login" ? "/auth/login" : "/auth/register";
      const res = await api.post(endpoint, data);

      if (type === "login") {
        login(res.data);
        console.log("Redirect to:", redirect);
        if (redirect && redirect.startsWith("/")) {
          router.push(redirect);
        } else {
          router.push("/protected");
        }
      } else {
        router.push("/email/login");
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response: {
            data: {
              message?: string;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              errors?: any;
              error?: string;
            };
            status?: number;
          };
        };

        // Handle different backend error formats
        const errorData = axiosErr.response.data;
        let errorMessage = `${type} failed`;

        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.errors) {
          if (Array.isArray(errorData.errors)) {
            errorMessage = errorData.errors.join(", ");
          } else if (typeof errorData.errors === "object") {
            const errorMessages = Object.values(errorData.errors).flat();
            errorMessage = errorMessages.join(", ");
          }
        }

        setApiError(errorMessage);
      } else {
        setApiError(`${type} failed`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-md">
          <p className="text-sm">{apiError}</p>
        </div>
      )}

      {type === "register" && (
        <div>
          <Input
            placeholder="Full Name"
            {...register("full_name", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Full name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Full name must be less than 50 characters",
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Full name can only contain letters and spaces",
              },
            })}
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm">{errors.full_name.message}</p>
          )}
        </div>
      )}

      <div>
        <Input
          placeholder="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register(
            "password",
            type === "register"
              ? {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                }
              : {
                  required: "Password is required",
                }
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <Button
        variant="emailLogin"
        type="submit"
        className="w-full flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : type === "login" ? "Login" : "Register"}
      </Button>
    </form>
  );
}
