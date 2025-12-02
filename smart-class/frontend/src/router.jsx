import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Turmas from "./pages/Turmas.jsx";
import TurmaDetalhe from "./pages/TurmaDetalhe.jsx";
import Grupos from "./pages/Grupos.jsx";
import Chamada from "./pages/Chamada.jsx";
import NotFound from "./pages/NotFound.jsx";
import ChamadasPage from "./pages/ChamadasPage.jsx";
import ChamadaDetalhes from "./pages/ChamadaDetalhes.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas privadas */}
      <Route
        path="/turmas"
        element={
          <ProtectedRoute>
            <Turmas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/turma/:id"
        element={
          <ProtectedRoute>
            <TurmaDetalhe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/grupos/:id"
        element={
          <ProtectedRoute>
            <Grupos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chamada/:id"
        element={
          <ProtectedRoute>
            <Chamada />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
      <Route path="/chamadas" element={<ChamadasPage />} />
      <Route path="/chamadas/:id" element={<ChamadaDetalhes />} />
    </Routes>
  );
}
