import { useState, useEffect } from 'react';
import { fetchQuery } from '../API/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import css from './App.module.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function fetchHandle() {
      try {
        setIsLoader(true);
        const data = await fetchQuery(searchQuery, page);
        if (data.total === 0) {
          return alert(
            'Sorry, but we did not find any images for your request. Please enter a valid query.'
          );
        }
        if (page === 1) {
          setImages(data.hits);
        } else {
          setImages(prevImages => [...prevImages, ...data.hits]);
        }
        setPage(page);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoader(false);
      }
    }

    fetchHandle();
  }, [searchQuery, page]);

  const handleFormSubmit = query => {
    if (searchQuery === query) {
      return;
    }
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  const openModal = image => {
    setShowModal(true);
    setSelectedImage(image);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && (
        <div>
          <p>Sorry, but we have a fetch error</p>
        </div>
      )}

      {images && (
        <>
          <ImageGallery gallery={images} onModal={openModal} />
          {showModal && selectedImage && (
            <Modal
              url={selectedImage.largeImageURL}
              tags={selectedImage.tags}
              onClose={closeModal}
            />
          )}
        </>
      )}

      {images.length > 0 && images.length % 12 === 0 && (
        <Button onClick={handleLoadMore} />
      )}

      {isLoader && <Loader />}
    </div>
  );
}
