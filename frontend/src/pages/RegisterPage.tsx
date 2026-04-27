import { useForm, type SubmitHandler } from "react-hook-form";
import { authSchema, type LoginSchema, type RegisterSchema } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/input";
import Button from "../components/button";

const RegisterForm = () => {
    const { register } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [globError, setGlobError] = useState<string | null>(null);
  
    const {
      register: registerForm,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(authSchema.registerSchema),
    });
  
    const isDisabled = Object.keys(errors).length > 0;
  
    const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
      await register(data);
    }
  
    return (
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username"
          type="text"
          placeholder="Billyjoe123"
          {...registerForm("username", { required: "Username is required" })}
        />
        <Input
          label="Password"
          type="password"
          placeholder="********"
          {...registerForm("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="********"
          {...registerForm("confirmPassword", {
            required: "Confirm Password is required",
            minLength: {
              value: 8,
              message: "Confirm Password must be at least 8 characters",
            },
          })}
        />
        <Button type="submit" disabled={isDisabled}>
          Register
        </Button>
      </form>
    );
  };


export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Register Page</h1>
            <RegisterForm />
        </div>
    )
}