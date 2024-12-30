import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "medium", className = "" }) => {
  const sizes = {
    small: "w-5 h-5",
    medium: "w-8 h-8",
    large: "w-16 h-16",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizes[size]} border-4 border-blue-500 rounded-full border-t-transparent`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
