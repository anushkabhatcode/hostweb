import React from 'react';


const UserCard = ({ icon, itemName, description }) => {
  return (
    
      <div className="user-card ">   
          <img src="/images/avatar.jpg" alt='Follow' data-tip="Follow" />

            <div className="">
              {icon && <span className="icon">{icon}</span>}
              <p>{itemName}</p>
            </div>
          <div className="description">{description}</div>
          
        
      </div>
    // </div>
  );
};

export default UserCard;
