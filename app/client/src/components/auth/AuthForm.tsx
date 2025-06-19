"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
  const login = useAuthStore((s) => s.login);

  const onSubmit = async (data: AuthFormValues) => {
    try {
      const endpoint = type === "login" ? "/auth/login" : "/auth/register";
      const res = await api.post(endpoint, data);

      if (type === "login") {
        login(res.data);
        router.push("/protected");
      } else {
        router.push("/login");
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response: { data: { message?: string } };
        };
        alert(axiosErr.response.data.message || `${type} failed`);
      } else {
        alert(`${type} failed`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {type === "register" && (
        <div>
          <Input
            placeholder="Full Name"
            {...register("full_name", { required: true })}
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm">Full name is required</p>
          )}
        </div>
      )}
      <div>
        <Input placeholder="Email" {...register("email", { required: true })} />
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">Password is required</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {type === "login" ? "Login" : "Register"}
      </Button>
    </form>
  );
}
