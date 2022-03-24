import React from 'react';

import styled from 'styled-components';

import Modal from './Modal';

const ModalWrapper = ({ children, handleModal }) => {
  return (
    <Modal>
      <Overlay className="modal" onClick={handleModal}>
        {children}
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 200;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export default ModalWrapper;
