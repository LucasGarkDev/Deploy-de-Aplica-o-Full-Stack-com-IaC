// GrupoCard.jsx
export default function GrupoCard({ grupo, selecionado, onSelect }) {
  const handleClick = () => {
    if (onSelect) onSelect(grupo.id); // só chama se existir
  };

  return (
    <div
      className={`grupo-card ${selecionado ? "ativo" : ""}`}
      onClick={handleClick}
    >
      <h4>{grupo.nome}</h4>
      <p>{grupo.alunos?.map((a) => a.nome).join(", ")}</p>
    </div>
  );
}

