import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import ChamadaCard from "../components/ChamadaCard.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { notify } from "../utils/notifications.js";
import axios from "axios";

export default function ChamadasPage() {
  const { user, token } = useAuth();
  const [chamadas, setChamadas] = useState([]);

  const fetchChamadas = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/chamada`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChamadas(res.data);
    } catch (error) {
      console.error("Erro ao carregar chamadas:", error);
      notify("Erro ao carregar chamadas", "error");
    }
  };

  useEffect(() => {
    fetchChamadas();
  }, []);

  return (
    <div>
      <Header usuario={user} />
      <div className="main-container">
        <h2>Chamadas Realizadas</h2>
        {chamadas.length === 0 ? (
          <p>Nenhuma chamada registrada ainda.</p>
        ) : (
          <div className="chamada-grid">
            {chamadas.map((c) => (
              <ChamadaCard key={c.id} chamada={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
