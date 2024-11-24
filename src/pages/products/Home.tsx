import { useAuthStore } from "../../app/store";

const Home = () => {
  const { user, token } = useAuthStore();

  return (
    <div>
      <h1>Welcome {user?.email}</h1>
      <h3>Your token is {token}</h3>
    </div>
  );
};

export default Home;
