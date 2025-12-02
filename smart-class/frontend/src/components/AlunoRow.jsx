import { useState } from "react";

export default function AlunoRow({ aluno, onEdit, onDelete, onPresenca, modoChamada }) {
  const [status, setStatus] = useState(null); // "presente", "ausente" ou null

  const handleEdit = () => onEdit?.(aluno);
  const handleDelete = () => onDelete?.(aluno.id);

  const marcarPresenca = (presente) => {
    setStatus(presente ? "presente" : "ausente");
    onPresenca?.(aluno, presente);
  };

  const cancelarMarcacao = () => {
    setStatus(null);
    onPresenca?.(aluno, null); // opcional: zera no estado global
  };

  return (
    <tr>
      <td>{aluno.nome}</td>

      {!modoChamada ? (
        <td className="acoes">
          <button onClick={handleEdit}>✏️</button>
          <button onClick={handleDelete}>🗑️</button>
        </td>
      ) : (
        <td className="presenca">
          {status === null && (
            <>
              <button className="sim" onClick={() => marcarPresenca(true)}>
                ✅
              </button>
              <button className="nao" onClick={() => marcarPresenca(false)}>
                ❌
              </button>
            </>
          )}

          {status === "presente" && (
            <>
              <span className="marcado presente">🟩 Presente</span>
              <button className="cancelar" onClick={cancelarMarcacao}>↩️</button>
            </>
          )}

          {status === "ausente" && (
            <>
              <span className="marcado ausente">🟥 Falta</span>
              <button className="cancelar" onClick={cancelarMarcacao}>↩️</button>
            </>
          )}
        </td>
      )}
    </tr>
  );
}
