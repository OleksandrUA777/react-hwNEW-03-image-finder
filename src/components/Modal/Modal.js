import { Component } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount(prevProps, prevState) {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onEscape();
    }
  };
  render() {
    const { image, onBackDrop, tags } = this.props;
    return (
      <Overlay className="overlay" onClick={onBackDrop}>
        <ModalWindow className="modal">
          <img src={image} alt={tags} width="500px" height="600px" />
        </ModalWindow>
      </Overlay>
    );
  }
}
