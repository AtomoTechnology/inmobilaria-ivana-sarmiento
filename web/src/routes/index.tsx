import { createBrowserRouter } from "react-router-dom"
import App from "../App";
import SignIn from "../views/auth/SignIn";
import SignUp from "../views/auth/signUp";
import Clients from "../views/clients/allClients";
import Owners from "../views/clients/owners";
import Contracts from "../views/contracts/Contracts";
import Home from "../views/Home";
import AllPaymentTypes from "../views/payment/allPaymentTypes";
import AllPropertyTypes from "../views/properties/allTypes";
import AllZones from "../views/zones/allZones";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute > <App /> </PrivateRoute>,
    errorElement: <h1>error</h1>, // TODO: design this pages 
    children: [
      {
        path: '/home',
        element: <PrivateRoute > <Home /> </PrivateRoute>,
      },
      {
        path: '/zones',
        element: <PrivateRoute > <AllZones /> </PrivateRoute>,
      },
      {
        path: '/payment-methods',
        element: <PrivateRoute > <AllPaymentTypes /> </PrivateRoute>,
      },
      {
        path: '/property-types',
        element: <PrivateRoute ><AllPropertyTypes /></PrivateRoute>,
      },
      {
        path: '/clients',
        element: <PrivateRoute ><Clients /></PrivateRoute>,
      },
      {
        path: '/owners',
        element: <PrivateRoute ><Owners /></PrivateRoute>,
      },
      {
        path: '/contracts',
        element: <PrivateRoute ><Contracts /></PrivateRoute>,
      },
      {
        path: '/signup',
        element: <PrivateRoute ><SignUp /></PrivateRoute>,
      },
      {
        path: '/*',
        element: <h1>Hello</h1>,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <PublicRoute> <SignIn /></PublicRoute>,
  },
]);