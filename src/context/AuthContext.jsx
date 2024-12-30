import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  console.log("action", action);
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        user: action.payload.data.user,
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
            const data = await response.json();
            console.log("dataProvider", data);
            dispatch({ type: "LOGIN", payload: { user: data.user, token } });
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
