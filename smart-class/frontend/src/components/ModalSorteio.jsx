export default function ModalSorteio({ resultado, onClose }) {
  // Se resultado for um objeto, tenta exibir o campo mais provável (nome)
  const textoResultado =
    resultado && typeof resultado === "object"
      ? resultado.nome || JSON.stringify(resultado)
      : resultado;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>🎲 Resultado do sorteio</h3>
        <p>{textoResultado || "Nenhum item encontrado"}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

