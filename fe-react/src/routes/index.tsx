import {
  createBrowserRouter,
} from "react-router-dom";

import Home from './home';
import ErrorPage from "../error-page";

const router = createBrowserRouter([
  {
    path: "/login",
    element: '<div>Hello world</div>',
  },
  {
    path: "/sign-up",
    element: '<div>Hello world</div>',
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