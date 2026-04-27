import { useForm, type SubmitHandler } from "react-hook-form";
import { authSchema, type LoginSchema } from "../schema/auth.schema";
import { login } from "../api/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const LoginForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [globError, setGlobError] = useState<string | null>(null);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema.loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setIsSubmitting(true);
    setGlobError(null);
    const response = await login(data);
    if (response?.message === 'Login successful') {
      //TODO 
    } else {
      setGlobError(response?.message || 'An error occurred');
    }
    setIsSubmitting(false);
  };

  const isDisabled = Object.keys(errors).length > 0;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Username"
        {...register("username", { required: "Username is required" })}
      />
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
      />
      <button type="submit" disabled={isDisabled}>Login</button>
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
