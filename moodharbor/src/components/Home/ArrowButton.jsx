import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ArrowButton = ({ onClick, children }) => {
  return (
    <button className="arrow-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default ArrowButton;