import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { authService } from "../services/authService";

export const useAuth = () => {
  const { user, isAuthenticated, loading, dispatch } = useContext(AuthContext);
  console.log("user", user);
  const login = async (email, password) => {
    try {
      const data = await authService.login({ email, password });
      console.log("dataLogin", data);
      dispatch({ type: "LOGIN", payload: data });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      dispatch({ type: "LOGIN", payload: data });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: "LOGOUT" });
  };

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch({ type: "LOGOUT" });
        return null;
      }

      const data = await authService.verifyToken(token);
      dispatch({ type: "LOGIN", payload: { user: data.user, token } });
      return data;
    } catch (error) {
      dispatch({ type: "LOGOUT" });
      return null;
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    verifyToken,
  };
};
