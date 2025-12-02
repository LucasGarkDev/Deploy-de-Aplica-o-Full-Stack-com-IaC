import { useNavigate } from "react-router-dom";

export default function ChamadaCard({ chamada }) {
  const navigate = useNavigate();

  const dataFormatada = new Date(chamada.dataHora).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div className="chamada-card" onClick={() => navigate(`/chamadas/${chamada.id}`)}>
      <h3>{chamada.turma?.nome || "Turma desconhecida"}</h3>
      <p>📅 {dataFormatada}</p>
      <p>🕒 {chamada.quantidadeAulas} aula(s)</p>
    </div>
  );
}
