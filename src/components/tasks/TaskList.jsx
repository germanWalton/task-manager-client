import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useTask } from "../../hooks/useTask";
import { useAuth } from "../../hooks/useAuth";

const TaskList = () => {
  const { loading: authLoading } = useAuth();
  const { tasks = [], loading, error, fetchTasks, updateTask, deleteTask } = useTask();
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  console.log("tasks", tasks);
  console.log("Fetchtasks", fetchTasks);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        if (!authLoading) {
          await fetchTasks(filter === "all" ? "" : `?completed=${filter === "completed"}`);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    loadTasks();
  }, [filter, authLoading]);

  const handleToggle = async (task) => {
    console.log("Task before toggle:", task);
    console.log("All tasks before toggle:", tasks);
    try {
      await updateTask(task._id, { completed: !task.completed });
      console.log("All tasks after toggle:", tasks);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      await updateTask(taskId, updates);
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const getFilteredTasks = () => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }
    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  };

  const filteredTasks = getFilteredTasks();
  const taskStats = {
    total: tasks?.length,
    completed: tasks?.filter((task) => task.completed)?.length,
    pending: tasks?.filter((task) => !task.completed)?.length,
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-8 text-red-500"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-semibold"
          >
            Tasks
          </motion.h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Filter size={20} />
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-500">Total</div>
            <div className="text-2xl font-semibold text-gray-700">{taskStats.total}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-500">Completed</div>
            <div className="text-2xl font-semibold text-green-600">{taskStats.completed}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-500">Pending</div>
            <div className="text-2xl font-semibold text-yellow-600">{taskStats.pending}</div>
          </div>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex space-x-2 py-2">
                {["all", "pending", "completed"].map((filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      filter === filterOption
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div layout className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-gray-500"
            >
              No tasks found
            </motion.div>
          ) : (
            filteredTasks.map((task) =>
              editingTask?._id === task._id ? (
                <TaskForm
                  key={task._id}
                  task={task}
                  onSubmit={(updates) => handleUpdateTask(task._id, updates)}
                  onCancel={() => setEditingTask(null)}
                />
              ) : (
                <TaskItem
                  key={task._id}
                  task={task}
                  onToggle={handleToggle}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )
            )
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TaskList;
