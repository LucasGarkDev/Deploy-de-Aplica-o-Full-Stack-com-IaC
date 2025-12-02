export default function TurmaCard({ turma, onEdit, onDelete, onOpen }) {
  return (
    <div
      className="turma-card"
      onClick={() => onOpen?.(turma)} // 🔹 protege se a função não for passada
    >
      <h3>{turma.nome}</h3>

      <div className="turma-actions">
        {/* ✏️ Botão de editar */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // impede abrir a turma ao clicar
            onEdit?.(turma); // 🔹 protege contra undefined
          }}
        >
          ✏️
        </button>

        {/* 🗑️ Botão de excluir */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(turma.id); // 🔹 protege contra undefined
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
