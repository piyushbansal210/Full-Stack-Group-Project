import { useForm, type SubmitHandler } from "react-hook-form";
import { authSchema, type LoginSchema } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/input";
import Button from "../components/button";

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [globError, setGlobError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(authSchema.loginSchema),
    });

    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        setGlobError(null);
        try {
            await login(data);
            navigate('/');
        } catch (err: any) {
            setGlobError(err.response?.data?.message ?? 'Login failed');
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

            {globError && <p role="alert">{globError}</p>}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in…' : 'Login'}
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