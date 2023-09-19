import {
  createBrowserRouter,
} from "react-router-dom";

import Home from './home';
import Login from './login';
import SignUp from './sign-up';

import ErrorPage from "../error-page";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: '<div>Hello world</div>',
  },
  {
    path: "/reset-password",
    element: '<div>Hello world</div>',
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  }
]);

export default router;