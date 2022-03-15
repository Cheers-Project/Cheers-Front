import { useState } from 'react';

const useModal = () => {
  const [modalState, setModalState] = useState(false);

  const handleModal = (e) => {
    if (e.target.classList.contains('modal') || !modalState) {
      setModalState(!modalState);
    }
  };

  return [modalState, handleModal];
};

export default useModal;
