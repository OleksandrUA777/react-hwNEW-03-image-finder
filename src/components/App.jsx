import { Component } from 'react';
import { Button } from './Button/Loader';
import { fetchImages } from './helpers/pixabay-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader.styled';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],

    loading: false,
    loadMore: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevQuery = prevState.query;
    const currentQuery = this.state.query;

    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (currentQuery.trim() === '') {
      return alert('Введи щось');
    }
    if (prevQuery !== currentQuery || prevPage !== currentPage) {
      this.setState({ loading: true, loadMore: false });

      fetchImages(currentQuery, page).then(images => {
        this.setState({ loading: false, loadMore: true });
        console.log(images);
        if (images.length >= 12) {
          // this.setState(prevState => ({
          //   images: [...prevState.images, ...images],
          // }));
          this.setImages(images);
          return;
        } else if (images.length <= 12) {
          this.setImages(images);

          this.setState({ loadMore: false });
        }
      });
    }
  }
  setImages = images => {
    this.setState(prevState => ({
      images: [...prevState.images, ...images],
    }));
  };
  resetData = () => {
    this.setState({ page: 1, images: [], loadMore: false });
  };
  handleSubmit = query => {
    this.setState({ query });
    this.resetData();
  };
  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log(this.state.page);
  };
  render() {
    const { images, loading, loadMore } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {loadMore && <Button onClick={this.handleLoadMoreClick} />}
        {loading && (
          <Loader
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        )}
      </>
    );
  }
}
