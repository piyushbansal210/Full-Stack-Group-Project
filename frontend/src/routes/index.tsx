import { createBrowserRouter } from "react-router";
import App from "../App";
import ErrorPage from "../pages/error-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);