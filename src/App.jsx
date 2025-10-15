import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { RequireAuth } from "./auth/RequireAuth";
import { RequireNoAuth } from "./auth/RequireNoAuth";
import LoginPage from "./auth/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import SesionesPage from "./pages/SesionesPage/SesionesPage";
import PatientsPage from "./pages/PatientsPage/PatientsPage";
import AgendaPage from "./pages/AgendaPage/AgendaPage";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <main className="app-content">
          <Routes>
            <Route
              path="/login"
              element={
                <RequireNoAuth>
                  <LoginPage />
                </RequireNoAuth>
              }
            />
            <Route
              path="/sesiones"
              element={
                <RequireAuth>
                  <SesionesPage />
                </RequireAuth>
              }
            />
            <Route
              path="/agenda"
              element={
                <RequireAuth>
                  <AgendaPage /> 
                </RequireAuth>
              }
            />
            <Route
              path="/notificaciones"
              element={
                <RequireAuth>
                  <NotificationsPage /> 
                </RequireAuth>
              }
            />
            <Route
              path="/pacientes"
              element={
                <RequireAuth>
                  <PatientsPage />
                </RequireAuth>
              }
            />
            <Route
              path="*"
              element={
                <RequireAuth>
                  <NotFound />
                </RequireAuth>
              }
            />
            
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
