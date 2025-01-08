import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import { AuthContext } from "./contexts/AuthContext";
import UserLayout from "./components/layout/userlayout";
import { useContext } from "react";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      {isLoggedIn && (
        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
        </Route>
      )}
      <Route path="/*" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
