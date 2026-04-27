import { login } from "../api/auth.api";

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Quiz App</h1>
            <button onClick={() => login({ username: "test", password: "testicals" })}>Login</button>
        </div>
    )
}