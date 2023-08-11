import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const rootModal = document.getElementById('root-modal');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if(e.currentTarget === e.target) {
        this.props.onClose()
    }
  }
  render() {
    const {url, tags} = this.props
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}><img src={url} alt={tags} width='800px' height='600px'/></div>
      </div>,
      rootModal
    );
  }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired
}