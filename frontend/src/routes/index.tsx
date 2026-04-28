import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/error-page";
import Home from "../pages/home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
]);