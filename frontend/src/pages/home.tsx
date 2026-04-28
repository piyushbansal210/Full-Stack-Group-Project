import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/button";

export default function Home() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col gap-4 items-center">
            <h1>Welcome to the Quiz App</h1>
            {user ? (
                <>
                    <p>Welcome back, {user.username}</p>
                    <Button onClick={() => navigate('/quiz')}>Start Quiz</Button>
                    <Button onClick={logout}>Logout</Button>
                </>
            ) : (
                <>
                    <Button onClick={() => navigate('/login')}>Go to Login</Button>
                    <Button onClick={() => navigate('/register')}>Go to Register</Button>
                </>
            )}
        </div>
    );
}