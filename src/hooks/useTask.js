import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { taskService } from "../services/taskService";

export const useTask = () => {
  const { state, dispatch } = useContext(TaskContext);
  console.log("useTask state:", state);

  const fetchTasks = async (filter = "") => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const data = await taskService.getTasks(filter);
      console.log("fetchTasks data:", data);
      dispatch({ type: "SET_TASKS", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const addTask = async (taskData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const data = await taskService.createTask(taskData);
      dispatch({ type: "ADD_TASK", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const updateTask = async (id, updates) => {
    console.log("Updating task with id:", id, "updates:", updates);
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const data = await taskService.updateTask(id, updates);
      console.log("Server response update:", data);
      dispatch({ type: "UPDATE_TASK", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await taskService.deleteTask(id);
      dispatch({ type: "DELETE_TASK", payload: id });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  };

  return {
    tasks: state?.tasks || [],
    loading: state?.loading,
    error: state?.error,
    fetchTasks,
    filter: state?.filter,
    updateTask,
    deleteTask,
    addTask,
  };
};
