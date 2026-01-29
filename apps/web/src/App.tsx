import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "~/pages/login";
import Dashboard from "~/pages/dashboard";
import Collection from "~/pages/collection";
import ApiKeys from "~/pages/api-keys";
import NotFound from "~/pages/not-found";
import ProtectedRoute from "~/components/navigation/protected-route";
import DashboardLayout from "~/components/layouts/dashboard-layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:collectionId" element={<Collection />} />
            <Route path="/dashboard/api-keys" element={<ApiKeys />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
