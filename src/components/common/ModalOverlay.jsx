import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { initializeModal } from 'redux/modules/modal';
import Modal from 'components/common/Modal';

const ModalOverlay = ({ children }) => {
  const dispatch = useDispatch();

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(initializeModal());
    }
  };
  return (
    <Modal>
      <Overlay onClick={closeModal}>{children}</Overlay>
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

export default ModalOverlay;
