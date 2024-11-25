import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useAuthStore } from "../../app/AuthStore";

interface Form {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { setAuth, user, clearAuth } = useAuthStore();

  const [formData, setFormData] = useState<Form>({
    id: 0,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<Form>({
    id: 0,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    const getUser = async () => {
      if (!user?.email) return;
      try {
        const res = await axiosInstance.get(`/users/${user?.email}`);
        setFormData({
          id: res.data.user.id || 0,
          name: res.data.user.name || "",
          email: res.data.user.email || "",
          password: "",
          password_confirmation: "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.email) {
      getUser();
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        `/profile/update/${formData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      setFormData({
        id: 0,
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

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axiosInstance.delete(`/profile/delete/${formData.id}`);
      clearAuth();
      navigate("/register");
    } catch (error) {
      console.log(error);
      clearAuth();
      navigate("/register");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <form action="" className="flex flex-col gap-3">
        <h1 className="text-center mb-3 font-bold text-xl">
          Update Your Profile
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

        <button onClick={handleUpdate} className="btn btn-primary">
          Update account
        </button>

        <button onClick={handleDelete} className="btn btn-error">
          Delete account
        </button>
      </form>
    </div>
  );
};

export default Profile;
