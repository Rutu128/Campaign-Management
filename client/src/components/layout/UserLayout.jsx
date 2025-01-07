import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";

const UserLayout = () => {
  return (
    <div className="flex flex-row">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
