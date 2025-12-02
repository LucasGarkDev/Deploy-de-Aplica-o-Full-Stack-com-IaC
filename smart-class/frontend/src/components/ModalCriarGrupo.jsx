import { useState } from "react";

export default function ModalCriarGrupo({ alunos, onClose, onCreate }) {
  const [nome, setNome] = useState("");
  const [selecionados, setSelecionados] = useState([]);

  const toggleAluno = (id) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ nome, alunosIds: selecionados });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Novo grupo</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do grupo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <div className="alunos-list">
            {alunos.map((a) => (
              <label key={a.id}>
                <input
                  type="checkbox"
                  checked={selecionados.includes(a.id)}
                  onChange={() => toggleAluno(a.id)}
                />
                {a.nome}
              </label>
            ))}
          </div>
          <div className="modal-actions">
            <button type="submit">Criar grupo</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
