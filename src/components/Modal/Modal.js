import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const rootModal = document.getElementById('root-modal');

export default function Modal({onClose, url, tags}) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  })

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if(e.currentTarget === e.target) {
        onClose()
    }
  }

    return createPortal(
      <div className={css.overlay} onClick={handleBackdropClick}>
        <div className={css.modal}><img src={url} alt={tags} width='800px' height='600px'/></div>
      </div>,
      rootModal
    );

}


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired
}