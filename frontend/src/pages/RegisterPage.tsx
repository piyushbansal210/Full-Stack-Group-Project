import { useForm, type SubmitHandler } from "react-hook-form";
import { authSchema, type RegisterSchema } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/input";
import Button from "../components/button";

const RegisterForm = () => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [globError, setGlobError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(authSchema.registerSchema),
    });

    const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
        setGlobError(null);
        try {
            const { confirmPassword, ...payload } = data;
            await registerUser(payload);
            navigate('/');
        } catch (err: any) {
            setGlobError(err.response?.data?.message ?? 'Registration failed');
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Username"
                type="text"
                placeholder="Billyjoe123"
                {...register("username")}
            />
            {errors.username && <span>{errors.username.message}</span>}

            <Input
                label="Password"
                type="password"
                placeholder="********"
                {...register("password")}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <Input
                label="Confirm Password"
                type="password"
                placeholder="********"
                {...register("confirmPassword")}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

            {globError && <p role="alert">{globError}</p>}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Registering…' : 'Register'}
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
    );
}