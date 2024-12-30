import { motion } from "framer-motion";
import { Check, X, Edit2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import DeleteButton from "../ui/DeleteButton";

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onToggle(task)}
        className={`p-2 rounded-full transition-colors ${
          task.completed
            ? "bg-green-100 text-green-600 hover:bg-green-200"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        title={task.completed ? "Mark as pending" : "Mark as completed"}
      >
        {task.completed ? <Check size={20} /> : <X size={20} />}
      </motion.button>

      <div className="flex-1 min-w-0">
        <motion.h3
          layout
          className={`font-medium text-gray-900 truncate ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </motion.h3>
        {task.description && (
          <motion.p layout className="text-sm text-gray-600 truncate mt-1">
            {task.description}
          </motion.p>
        )}
        <motion.span layout className="text-xs text-gray-400 block mt-1">
          Created: {format(new Date(task.createdAt), "MMM d, yyyy h:mm a")}
        </motion.span>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-2 ${
            task.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onEdit(task)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
          title="Edit task"
        >
          <Edit2 size={20} />
        </motion.button>
        <DeleteButton onDelete={() => onDelete(task._id)} taskTitle={task.title} />
      </div>
    </motion.div>
  );
};

export default TaskItem;
