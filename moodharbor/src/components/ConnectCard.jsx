import React from 'react';
import { Link } from 'react-router-dom';


const ConnectCard = ({ icon, itemName, description, bgcolors, textcolor }) => {
  return (
    // <div className='graph-card-container'>
      <div className={`graph-card ${bgcolors}`}>
      
                  
          <div className={`${textcolor}`}>
          <img src="/images/avatar.jpg" />
            <div className="mood-name">
              {icon && <span className="icon">{icon}</span>}
              {itemName}
            </div>
            <div className="description">{description}</div>
            
          </div>
        
      </div>
    // </div>

  );
};

export default ConnectCard;
