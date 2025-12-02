import "./App.css";
import AppRouter from "./router.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { useContext } from "react";
import { UIContext } from "./context/UIContext.jsx";

export default function App() {
  const { loading } = useContext(UIContext);

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="app-container">
        <AppRouter />
      </div>
    </>
  );
}
