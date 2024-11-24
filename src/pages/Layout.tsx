import { useAuthStore } from "../app/AuthStore";
import Navbar from "../components/Navbar";
import { Navigate, Outlet } from "react-router";

const Layout = () => {
  const { user } = useAuthStore();

  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Layout;
