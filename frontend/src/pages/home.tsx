import { useNavigate } from "react-router";
import Button from "../components/button";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-4 items-center ">
            <h1>Welcome to the Quiz App</h1>
            <Button onClick={() => navigate('/login')}>Go to Login</Button>
            <Button onClick={() => navigate('/register')}>Go to Register</Button>
        </div>

    )
}