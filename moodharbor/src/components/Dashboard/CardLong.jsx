import React from 'react';
import { Link } from 'react-router-dom';


const CardLong = ({ icon, itemName, description, author, className, url }) => {
  return (
    // <Link to={url}>   
      <div className="activity-card">  
        <div className="card-content">
            <div className="mood-name">
              {icon && <span className="icon">{icon}</span>}
              {itemName}
            </div>
          <div className="description">{description}</div>
          <div className={className}> <cite>{author}</cite></div>
        </div>
    </div>
    // </Link>
  );
};

export default CardLong;
