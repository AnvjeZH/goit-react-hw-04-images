import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  largeImageURL,
  onModal,
}) => (
  <li
    className={css.imageGalleryItem}
    key={id}
    onClick={() => onModal({ largeImageURL, tags })}
  >
    <img className={css.imageGalleryItem_image} src={webformatURL} alt={tags} />
  </li>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onModal: PropTypes.func.isRequired,
};
