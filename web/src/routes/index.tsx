import { createBrowserRouter } from "react-router-dom"
import App from "../App";
import SignIn from "../views/auth/SignIn";
import Contracts from "../views/contracts/Contracts";
import Home from "../views/Home";
import AllPayment from "../views/payment/all";
import AllZones from "../views/zones/all";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/payment-methods',
        element: <AllPayment />,
      },
      {
        path: '/zones',
        element: <AllZones />,
      },
      {
        path: '/contracts',
        element: <Contracts />,
      }
    ]
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
]);