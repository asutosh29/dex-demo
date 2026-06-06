import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader2 } from "@repo/ui/icons";
import ProtectedRoute from "./components/navigation/protected-route";
import DashboardLayout from "./components/layouts/dashboard-layout";

// Lazy load route components for code splitting
const Login = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Collection = lazy(() => import("./pages/collection"));
const ApiKeys = lazy(() => import("./pages/api-keys"));
const Thread = lazy(() => import("./pages/chat/thread"));
const NotFound = lazy(() => import("./pages/not-found"));

function LegacySubCollectionRedirect() {
  const { collectionId, subCollectionId } = useParams();

  if (!collectionId) {
    return <Navigate to="/dashboard" replace />;
  }

  if (subCollectionId) {
    return (
      <Navigate
        to={`/dashboard/${collectionId}?sub=${encodeURIComponent(subCollectionId)}`}
        replace
      />
    );
  }

  return <Navigate to={`/dashboard/${collectionId}`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:collectionId" element={<Collection />} />
              <Route
                path="/dashboard/:collectionId/:subCollectionId"
                element={<LegacySubCollectionRedirect />}
              />
              <Route path="/dashboard/api-keys" element={<ApiKeys />} />
              <Route path="/chat/:threadId?" element={<Thread />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
