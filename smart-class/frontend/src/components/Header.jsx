import { useNavigate } from "react-router-dom";

export default function Header({ usuario }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <h2>SmartClassroom</h2>
      <div className="header-right">
        <span>👋 {usuario?.nome || "Professor"}</span>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </header>
  );
}
