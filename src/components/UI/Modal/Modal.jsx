import Backdrop from '../Backdrop/Backdrop';

import './Modal.css';

function Modal({ children, show }) {


  return (
    <>
      <Backdrop show={show} />
      <div className={`modal${show ? " show" : ""}`}>
        {children}
      </div>
    </>
  );
}

export default Modal
