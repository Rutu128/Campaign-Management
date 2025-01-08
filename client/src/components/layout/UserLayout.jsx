import { Outlet } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import { useState } from "react";

const UserLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex w-full min-h-screen">
      <div className="fixed left-0 top-0 h-full">
        <div 
          className={`relative h-full transition-all duration-300 ease-in-out bg-white shadow-lg
          ${isExpanded ? 'w-64' : 'w-16'}`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <Navbar />
        </div>
      </div>
      <main 
        className={`flex-1 min-h-screen transition-all duration-300 ease-in-out
        ${isExpanded ? 'ml-64' : 'ml-16'}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;