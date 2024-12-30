import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

// const App = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <TaskProvider>
//           <Routes>
//             <Route path="/" element={<Navigate to="/tasks" replace />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route
//               path="/tasks"
//               element={
//                 <ProtectedRoute>
//                   <Tasks />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </TaskProvider>
//       </AuthProvider>
//     </Router>
//   );
// };

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
