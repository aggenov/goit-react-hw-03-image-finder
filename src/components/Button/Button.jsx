import React from "react";
import PropTypes from 'prop-types';
import { ButtonWraper, LoadMoreBtn } from "./Button.styled";

export  class Button extends React.Component{

  render(){

    const {onClick}  = this.props
    return(
      <ButtonWraper>
          <LoadMoreBtn type="button" onClick= { ()=>onClick() }>
            Load more
          </LoadMoreBtn>
      </ButtonWraper>
    )
  }
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};