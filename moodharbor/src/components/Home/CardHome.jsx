import React, { useState } from 'react';
import ArrowButton from './ArrowButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CardHome = ({ images, icon, itemName, description, author }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
   
    const nextImage = () => {
       setCurrentIndex((currentIndex + 1) % images.length);
    };
   
    const prevImage = () => {
       setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

  return (
    
      <div className="card-home">  
        <img src={images[currentIndex]} />
          <div className="card-content">
            <div className="mood-name">
              {icon && <span className="icon">{icon}</span>}
              {itemName}
            </div>
          <div className="description">{description}</div>
          <div className="description">{author}</div>
        </div>
        <div className='arrow-container'>       
          <div className='arrow-left'> 
            <ArrowButton onClick={nextImage}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </ArrowButton>
          </div>
          <div className='arrow-right'> 
            <ArrowButton onClick={nextImage}>
              <FontAwesomeIcon icon={faArrowRight} />
            </ArrowButton>
          </div>
        </div>
     
      </div>
  );
};

export default CardHome;
