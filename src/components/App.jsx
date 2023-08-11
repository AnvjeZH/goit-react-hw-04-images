import { Component } from 'react';
import { fetchQuery } from '../API/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import css from './App.module.css';

class App extends Component {
  state = {
    query: '',
    images: [],
    selectedImage: null,
    page: 1,
    error: null,
    isLoader: false,
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    if (query !== prevQuery || page !== prevPage) {
      try {
        this.setState({ isLoader: true });
        const data = await fetchQuery(query, page);
        if (data.total === 0) {
          return alert(
            'Sorry, but we did not find any images for your request. Please enter a valid query.'
          );
        }
        if (page === 1) {
          this.setState({ images: data.hits });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }));
        }
        this.setState({ page });
      } catch (error) {
        this.setState({ error });
        console.log(error);
      } finally {
        this.setState({ isLoader: false });
      }
    }
  }

  handleFormSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ query, images: [], page: 1 });
  };

  openModal = image => {
    this.setState({ showModal: true, selectedImage: image });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  handleLoadMore = () => {
    const { page } = this.state;
    const nextPage = page + 1;
    this.setState({ page: nextPage });
  };

  render() {
    const { images, isLoader, error, selectedImage, showModal } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && (
          <div>
            <p>Sorry, but we have a fetch error</p>
          </div>
        )}

        {images && (
          <>
            <ImageGallery gallery={images} onModal={this.openModal} />
            {showModal && selectedImage && (
              <Modal
                url={selectedImage.largeImageURL}
                tags={selectedImage.tags}
                onClose={this.closeModal}
              />
            )}
          </>
        )}

        {images.length > 0 && images.length % 12 === 0 && (
          <Button onClick={this.handleLoadMore} />
        )}

        {isLoader && <Loader />}
      </div>
    );
  }
}

export default App;
