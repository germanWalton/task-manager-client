import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const token = action.payload.data?.token || action.payload.token;
      const user = action.payload.data?.user || action.payload.user;

      if (token) {
        localStorage.setItem("token", token);
      }
      return {
        ...state,
        user: user,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload.data,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const API_URL = import.meta.env.VITE_API_URL;
          const response = await fetch(`${API_URL}/api/auth/validate`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("token", token);
          console.log("responseAuthProvider", response);
          if (response.ok) {
            const tokenParts = token.split(".");
            const payload = JSON.parse(atob(tokenParts[1]));

            const user = {
              id: payload.userId,
              email: payload.email,
            };
            dispatch({ type: "LOGIN", payload: { token, user } });
          } else {
            dispatch({ type: "LOGOUT" });
          }
        } catch (error) {
          dispatch({ type: "LOGOUT" });
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initializeAuth();
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
