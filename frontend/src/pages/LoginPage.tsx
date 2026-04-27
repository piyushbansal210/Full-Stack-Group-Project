import { useForm, type SubmitHandler } from "react-hook-form";
import { authSchema, type LoginSchema } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/input";
import Button from "../components/button";

const LoginForm = () => {
  const { login } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globError, setGlobError] = useState<string | null>(null);

  const {
    register: LoginSchema,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema.loginSchema),
  });

  const isDisabled = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    await login(data);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Username"
        type="text"
        placeholder="Billyjoe123"
        {...LoginSchema("username", { required: "Username is required" })}
      />
      <Input
        label="Password"
        type="password"
        placeholder="********"
        {...LoginSchema("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
      />
      <Button type="submit" disabled={isDisabled}>
        Login
      </Button>
    </form>
  );
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  );
}
