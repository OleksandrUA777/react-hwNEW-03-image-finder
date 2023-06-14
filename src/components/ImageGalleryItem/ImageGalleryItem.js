import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  handleToggleModal = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };
  handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      this.handleToggleModal();
    }
  };
  render() {
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <Item className="gallery-item">
          <Image
            src={webformatURL}
            alt={tags}
            onClick={this.handleToggleModal}
          />
        </Item>
        {isOpen && (
          <Modal
            image={largeImageURL}
            onBackDrop={this.handleBackDropClick}
            onEscape={this.handleToggleModal}
            tags={tags}
          />
        )}
      </>
    );
  }
}
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
