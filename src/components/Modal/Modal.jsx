import React from "react";
import PropTypes from "prop-types";
import { Overlay, ModalWinow } from "./Modal.styled";


export default class Modal extends React.Component{
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) { 
      this.props.onClose(); 
    }
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render (){
    const {children} = this.props;
    return(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWinow> {children}  </ModalWinow>
      </Overlay>
    )
  }
};

Modal.propTypes = {
  children: PropTypes.element.isRequired
};