import { createContext, useState, useCallback } from "react";
import { getRequest, postRequest, baseUrl } from "@/utils/services";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  const checkLoginStatus = async () => {
    setLoading(true);
    try {
      const response = await getRequest(`${baseUrl}/auth/ping`);
      if (!response.error) {
        setUser(response.data);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Error checking login status:", err);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const response = await postRequest(`${baseUrl}/auth/login`, {
        email,
        password,
      });
      if (!response.error) {
        const userData = response.data.user;
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("Logged in successfully!");
        return true;
      } else {
        setError(response.message);
        toast.error(response.message);
        return false;
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Login failed!");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await postRequest(`${baseUrl}/auth/register`, data);
      if (!response.error) {
        const userData = response.data.user;
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("Registered successfully!");
        return true;
      } else {
        setError(response.message);
        toast.error(response.message);
        return false;
      }
    } catch (err) {
      console.error("Error during registration:", err);
      toast.error("Registration failed!");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getRequest(`${baseUrl}/auth/logout`);
      if (!response.error) {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        toast.success("Logged out successfully!");
      } else {
        setError(response.message);
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Error during logout:", err);
      toast.error("Logout failed!");
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isLoggedIn,
    checkLoginStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
