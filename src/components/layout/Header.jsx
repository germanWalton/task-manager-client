import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.h1 
            className="text-2xl font-bold text-gray-900"
            whileHover={{ scale: 1.05 }}
          >
            Task Manager
          </motion.h1>
          
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Welcome to Task Manager!!
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;