import { useState, createContext, useContext } from 'react';

const ModalContext = createContext();

export const ModalToggleProvider = (props) => {
  const { children } = props;
  const [modalClose, setModalClose] = useState(false);
  return (
    <ModalContext.Provider value={{ modalClose, setModalClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalToggleContext = () => useContext(ModalContext);
