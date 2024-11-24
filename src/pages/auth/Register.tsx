import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useAuthStore } from "../../app/AuthStore";

interface Form {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Register = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuthStore();

  const [formData, setFormData] = useState<Form>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<Form>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axiosInstance.post("/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
      setAuth(formData, res.data.token);
      navigate("/home");
    } catch (error: any) {
      console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <form action="" className="flex flex-col gap-3">
        <h1 className="text-center mb-3 font-bold text-xl">
          Create an account
        </h1>
        <input
          type="text"
          placeholder="User name"
          className="input input-bordered w-full max-w-xs"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <small className="text-red-500 text-sm">{errors.name}</small>
        )}
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
        <input
          type="password"
          placeholder="Confirmation Password"
          className="input input-bordered w-full max-w-xs"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
        />
        {errors.password_confirmation && (
          <small className="text-red-500 text-sm">
            {errors.password_confirmation}
          </small>
        )}
        <button onClick={handleRegister} className="btn btn-primary">
          Create account
        </button>
        <small className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </small>
      </form>
    </div>
  );
};

export default Register;
