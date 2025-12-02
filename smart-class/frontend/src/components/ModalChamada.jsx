import { useState } from "react";

export default function ModalChamada({ onClose, onStart }) {
  const [dataHora, setDataHora] = useState("");
  const [quantidadeAulas, setQuantidadeAulas] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ dataHora, quantidadeAulas });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Iniciar Chamada</h3>
        <form onSubmit={handleSubmit}>
          <label>Data e hora</label>
          <input
            type="datetime-local"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            required
          />
          <label>Quantidade de aulas</label>
          <input
            type="number"
            min="1"
            max="8"
            value={quantidadeAulas}
            onChange={(e) => setQuantidadeAulas(e.target.value)}
          />
          <div className="modal-actions">
            <button type="submit">Iniciar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
