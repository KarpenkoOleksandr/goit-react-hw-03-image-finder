import React, { Component } from 'react';
import axios from 'axios';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal';
import {Loader} from './Loader/Loader';
import { AppWrapper } from './App.styled';
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    query: '',
    page: 1,
    showModal: false,
    selectedImage: null,
    isLastPage: false,
  };

async componentDidUpdate(_prevProps, prevState) { 
  if (prevState.query !== this.state.query) {       
      this.setState({ images: [], page: 1, isLastPage: false }, () => {
  this.fetchImages();
});
    }  
}

  async fetchImages () {
    const { query, page } = this.state;
    const API_KEY = '39776861-570fd88826b57aa6e10d37d1b';
    try {
      this.setState({ isLoading: true });
      const response = await axios.get(`https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
        const { hits, totalHits } = response.data;

        if (hits.length === 0) { 
        return toast('Sorry, there are no images matching your request...', {type: "info", position: toast.POSITION.TOP_CENTER});
        }

        const modifiedHits = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL
    }));

        this.setState(prevState => ({
          images: [...prevState.images, ...modifiedHits],
          page: prevState.page + 1,
          isLastPage: prevState.images.length + modifiedHits.length >= totalHits,
        }));
    } catch (error) {
      this.setState({ error: error.message });
    }
    finally{
        this.setState({ isLoading: false });
      };
  };

  handleSearchSubmit = query => {
      if (this.state.query === query) {
      return;
    }
  this.setState({ query: query, page: 1, images: [], error: null, isLastPage: false });
};

  handleImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
    document.body.style.overflow = 'hidden';
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null, showModal: false });
    document.body.style.overflow = 'auto';
  };

  render() {
    const { images, isLoading, error, showModal, selectedImage, isLastPage } = this.state;

    return (
      <AppWrapper>
        <ToastContainer
          transition={Bounce}
          role={alert}
          autoClose={3000}
          theme="light"
        />
        <Searchbar onSubmit={this.handleSearchSubmit} />

        {error && <p>Error: {error}</p>}

        <ImageGallery images={images} onItemClick={this.handleImageClick} />

        {isLoading && <Loader />}
        

        {!isLoading && images.length > 0 && !isLastPage && (
          <Button onClick={this.fetchImages} />
        )}

        {showModal && (
          <Modal image={selectedImage} onClose={this.handleModalClose} />
        )}
      </AppWrapper>
    );
  }
}
