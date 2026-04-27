import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/error-page";
import Home from "../pages/home";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <LoginPage /> },
      
    ],
  },
]);