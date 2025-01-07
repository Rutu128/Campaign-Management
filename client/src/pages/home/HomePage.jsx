import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const {user} = useContext(AuthContext);
  return (
    <>
      <div>
        <h1>Welcome to the home page</h1>
        <p>This is a protected route</p>
        <p>User: {user?.email}</p>
      </div>
    </>
  );
};

export default HomePage;
