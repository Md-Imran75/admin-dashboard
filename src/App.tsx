import { ModeToggle } from "./features/theme/components/mode-toggle";
import { UserManagement } from "./features/user-management";
import { Routes, Route } from "react-router-dom"; // Correct import
import MainLayout from "./pages/MainLayout";
import DashBoard from "./features/dashboard/DashBoard";
import Login from "./features/auth/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="user-management" element={
            <QueryClientProvider client={queryClient}>
              <UserManagement />
            </QueryClientProvider>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
