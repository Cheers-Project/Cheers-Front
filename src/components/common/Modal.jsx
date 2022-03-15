import ReactDom from 'react-dom';

const Modal = ({ children }) => {
  return ReactDom.createPortal(children, document.getElementById('root'));
};

export default Modal;
