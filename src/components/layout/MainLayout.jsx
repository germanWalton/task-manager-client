import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { TaskProvider } from "../../context/TaskContext";

const MainLayout = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-50">
          <Outlet />
        </div>
      </TaskProvider>
    </AuthProvider>
  );
};

export default MainLayout;
