import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'

const ImageGallery = ({ gallery, onModal }) => {
  return (
    <ul className={css.imageGallery}>
      {gallery.map(({ webformatURL, id, tags, largeImageURL }) => (
        <ImageGalleryItem 
        webformatURL={webformatURL}
        id={id}
        largeImageURL={largeImageURL} 
        key={id} 
        tags={tags}
        onModal={onModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired
  })).isRequired,
  onModal: PropTypes.func.isRequired
}