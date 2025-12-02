import { useState } from "react";

export default function ModalCriarTurma({ onClose, onCreate }) {
  const [nome, setNome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(nome);
    setNome("");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Criar nova turma</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome da turma"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <div className="modal-actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
