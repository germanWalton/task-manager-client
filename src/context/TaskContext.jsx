import { createContext, useReducer } from "react";

export const TaskContext = createContext(null);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskReducer = (state, action) => {
  console.log("stateTaskReducer", state, "actionTaskReducer", action);
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: null,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        loading: false,
        error: null,
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => (task._id === action.payload._id ? action.payload : task)),
        loading: false,
        error: null,
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
};
