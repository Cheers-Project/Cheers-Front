import { useState } from 'react';

const useModal = (initialState = false) => {
  const [modalState, setModalState] = useState(initialState);

  const handleModal = (e) => {
    if (e.target.classList.contains('modal') || !modalState) {
      setModalState(!modalState);
    }
  };

  return [modalState, handleModal, setModalState];
};

export default useModal;
