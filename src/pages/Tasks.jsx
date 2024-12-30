import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Header from "../components/layout/Header";
import TaskList from "../components/tasks/TaskList";
import TaskForm from "../components/tasks/TaskForm";
import { useTask } from "../hooks/useTask";

const Tasks = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { addTask, error } = useTask();

  const handleAddTask = async (taskData) => {
    try {
      await addTask(taskData);
      setShowAddForm(false);
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Your Tasks</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus size={20} />
              <span>Add Task</span>
            </motion.button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4 p-4 bg-red-50 text-red-700 rounded-md"
              >
                {error}
              </motion.div>
            )}

            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6"
              >
                <TaskForm onSubmit={handleAddTask} onCancel={() => setShowAddForm(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <TaskList />
      </main>
    </div>
  );
};

export default Tasks;
