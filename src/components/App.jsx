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

        if (images.length < 12 || images.length === 0) {
          this.setState({ loadMore: false });
          alert(`there are no more images conected with  ${this.state.query}`);
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
        }));
      });
    }
  }
  resetData = () => {
    this.setState({ page: 1, images: [], loadMore: false });
  };
  handleSubmit = query => {
    this.setState({ query });
    this.resetData();
  };
  handleButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log(this.state.page);
  };
  render() {
    const { images, loading, loadMore } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {loadMore && (
          <Button disabled={loading} onClick={this.handleButtonClick} />
        )}
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
