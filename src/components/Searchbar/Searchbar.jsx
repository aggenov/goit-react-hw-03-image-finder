import { Notify } from "notiflix";
import React from "react";
// import {ReactComponent as SearchIcon } from '../SVG/search.svg'
import { SearchbarWrap, Form, SearchFormBtn, SearchFormBtnLabel, SearchInput } from "./Searchbar.styled";

export default class Searchbar extends React.Component {

  state= {
    searchName: '',
  }

  //функция записи изменения значения поля поиска в стейт
  onImputChange = (event) => {
      const searchName = event.target.value;
      this.setState({searchName});
  }

  // функция onClick при нажати  на кнопку
  onClickSearchBtn = (event) => {
      event.preventDefault();

      const searchName = this.state.searchName.trim().toLowerCase();

      // если поле пустое - сообщаем
      if (searchName) {
        this.props.onSubmit(searchName); //отправляем список картинок в props  -> Арр
        this.setState({searchName: ''}); //очищаем стейт формы
      } else {
        Notify.failure('Fill in the search field');
      }
  }


  render(){

  const {searchName} = this.state;
    
    return(
      <SearchbarWrap>
        <Form>
          <SearchFormBtn
            type="submit" 
            className="button" 
              onClick={this.onClickSearchBtn}
          >
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
              {/* <SearchIcon  size ='20'/> */} 
          </SearchFormBtn>

          <SearchInput
            className="input"
            name ="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
              maxLength='20'
              value={searchName}
              onChange={this.onImputChange}
          />
        </Form>
      </SearchbarWrap>
    )
  }
}
