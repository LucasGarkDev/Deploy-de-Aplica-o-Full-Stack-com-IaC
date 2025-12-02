import { createContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);

  const openModal = (name) => setModal(name);
  const closeModal = () => setModal(null);

  return (
    <UIContext.Provider value={{ loading, setLoading, modal, openModal, closeModal }}>
      {children}
    </UIContext.Provider>
  );
};
