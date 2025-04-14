import { Routes, Route } from "react-router-dom";
import { SessionListPage } from "@/pages/MainPage";
import { SessionDetailPage } from "@/pages/SessionDetailPage";
import { LoginPage } from "@/pages/LoginPage";
import { AdminPage } from "@/pages/AdminPage";
import { MainLayoutWithSidebar } from "./layouts/MainLayoutWithSidebar";
import { SimpleLayout } from "./layouts/SimpleLayout";
import { ProtectedRoute } from "./providers/with-auth";

function App() {
  return (
    <Routes>
      <Route element={<MainLayoutWithSidebar />}>
        <Route path="/" element={<SessionListPage />} />
      </Route>

      <Route element={<SimpleLayout />}>
        <Route path="/session/:sessionId" element={<SessionDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<SimpleLayout />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
