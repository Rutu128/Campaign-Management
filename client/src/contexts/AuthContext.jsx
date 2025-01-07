import { createContext, useState, useEffect } from "react";
import { getRequest, postRequest, baseUrl } from "@/utils/services";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const publicRoutes = ["/login", "/register"];
    const currentPath = window.location.pathname;
    const isPublicRoute = publicRoutes.includes(currentPath);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLoggedIn(true);
      setLoading(false);
    } else if (!isPublicRoute && !isLoggedIn) {
      isLoggedInCheck();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const isLoggedInCheck = async () => {
    const response = await getRequest(`${baseUrl}/auth/ping`);
    if (response.error) {
      toast.error(response.message);
    } else {
      setIsLoggedIn(true);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    setLoading(true);
    const response = await postRequest(`${baseUrl}/auth/login`, {
      email,
      password,
    });
    setLoading(false);
    if (response.error) {
      setError(response.message);
      toast.error(response.message);
      return false;
    } else {
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsLoggedIn(true);
      toast.success("Logged in successfully!");
      return true;
    }
  };

  const register = async (data) => {
    setLoading(true);
    const response = await postRequest(`${baseUrl}/auth/register`, data);
    setLoading(false);
    if (response.error) {
      setError(response.message);
      toast.error(response.message);
      return false;
    } else {
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsLoggedIn(true);
      toast.success("Registered successfully!");
      return true;
    }
  };

  const logout = async () => {
    setLoading(true);
    const response = await getRequest(`${baseUrl}/auth/logout`);
    setLoading(false);
    if (response.error) {
      setError(response.message);
    } else {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("user");
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isLoggedIn,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
