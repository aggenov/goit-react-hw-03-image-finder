import React from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "api/fetchImages";
import {Button} from "../Button/Button";
import { Body } from "./App.styled";
import { Dna } from "react-loader-spinner";
import { Notify } from "notiflix";




export class App extends React.Component {

  state = {
    searchName: '',
    images: [],
    page: 1,
    loading: false,
    error: null,  
    isLoadMoreShown: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    document.title = "Image finder"
    const { searchName, page } = this.state;

    if (prevState.searchName !== searchName || prevState.page !== page) {
      try {
        // показываем лоадер, прячем кнопку Load more
          this.setState({ loading: true, isLoadMoreShown: false });

          //массив найденных картинок
          const searchImages = await fetchImages(searchName, page);

          //если картинок нет - сообщаем
          if (searchImages.length === 0) {
            Notify.failure(
              `Sorry, the images you requested: ${searchName} not found.`
            );
          }
            // добавляем найденные картинки в стейт
          this.setState(({ images }) => {
            return {
              images: [...images, ...searchImages],
            };
          });
            //если картинок больше 12 - объявляем видимость кнопки Load more
          if (searchImages.length >= 12) {
            this.setState({ isLoadMoreShown: true });
          }
          //когда есть ошибка при загрузке
      } catch (error) {
          Notify.failure('Something went wrong');
          // по окончании загрузки прячем лоадер
      } finally {
          this.setState({ loading: false });
      }
    }
  }

  //функция записи найденых картинок в стейт при отправке формы
  handleFormSubmit = searchName => {
    this.setState({
      searchName,
      images: [],
      page: 1,
    });
  };
  //нажати кнопки *Load More* меняет номер страницы в стейте +1
  loadMoreSubmit = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };


  render (){
  const {images, loading, isLoadMoreShown } = this.state;
  return (
    <Body>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        { !!images.length && (<ImageGallery images={images} />)}
        { loading && (
          <Dna
            visible={true}
            height="60"
            width="60"
            ariaLabel="dna-loading"
            wrapperStyle={{  margin: '0 auto' }}
            wrapperClass="dna-wrapper"
        />
        )}                        
      
        {isLoadMoreShown&&<Button onClick = {this.loadMoreSubmit}/>}
    </Body>
  );
}
};
