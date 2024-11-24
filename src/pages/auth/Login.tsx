import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useAuthStore } from "../../app/AuthStore";

interface Form {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuthStore();

  const [formData, setFormData] = useState<Form>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Form>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axiosInstance.post("/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      setAuth(formData, res.data.token);
      navigate("/home");
    } catch (error: any) {
      setFormData({
        email: "",
        password: "",
      });
      console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <form action="" className="flex flex-col gap-3">
        <h1 className="text-center mb-3 font-bold text-xl">Hello Again</h1>
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered w-full max-w-xs"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <small className="text-red-500 text-sm">{errors.email}</small>
        )}
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <small className="text-red-500 text-sm">{errors.password}</small>
        )}
        <button onClick={handleLogin} className="btn btn-primary">
          Log In
        </button>
        <small className="text-center">
          Do not have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Sign Up
          </Link>
        </small>
      </form>
    </div>
  );
};

export default Login;
