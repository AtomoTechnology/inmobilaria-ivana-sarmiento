import { createBrowserRouter } from "react-router-dom"
import SignIn from "../views/auth/SignIn";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
]);