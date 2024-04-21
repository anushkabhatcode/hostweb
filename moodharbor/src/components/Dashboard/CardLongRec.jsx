import React from 'react';


const CardLongRec = ({ icon, itemName, description }) => {
  return (
    
      <div className="activity-card-tools">  
          <div className="card-content">
            <div className="mood-name">
              {icon && <span className="icon">{icon}</span>}
              {itemName}
            </div>
          <div className="description">{description}</div>
          
        </div>
      </div>
  );
};

export default CardLongRec;


{/* <div className='row'>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{detail}</p>
                  // <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div> */}