import {
  createBrowserRouter,
} from "react-router-dom";

import Home from './home';
import Login from './login';
import SignUp from './sign-up';
import ForgotPassword from './forgot-password';
import ResetPassword from './reset-password';
import Users from './users';
import UsersAdd from './users/add';
import UsersEdit from './users/edit';
import Roles from './roles';
import Files from './files';

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
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/add",
        element: <UsersAdd />,
      },
      {
        path: "users/:id",
        element: <UsersEdit />,
      },
      {
        path: "roles",
        element: <Roles />,
      },
      {
        path: "files",
        element: <Files />,
      },
      {
        path: "files/add",
        element: <UsersAdd />,
      },
    ]
  },
]);

export default router;