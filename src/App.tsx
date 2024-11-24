import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/products/Home";
import Cart from "./pages/products/Cart";
import Details from "./pages/products/Details";
import { useAuthStore } from "./app/AuthStore";

const App = () => {
  const { user } = useAuthStore();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={user ? "/home" : "/login"} />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/home" /> : <Register />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/home" /> : <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/product/:id",
          element: <Details />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
