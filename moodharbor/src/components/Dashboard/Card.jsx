import React from 'react';
import { Link } from 'react-router-dom';


// const Card = ({ children }) => {
//   return (
//     <div className="card">
//       <div className="">          
//           <div className="DesiredTrendContainer">
//             <div className="DesiredTrend">
//               {children}
//             </div>
//           </div>
//         </div>
//       </div>
const Card = ({ icon, itemName, description }) => {
  return (
      <div className="card">
        <Link to="/">          
          <div className="card-content">
            <div className="mood-name">
              {icon && <span className="icon">{icon}</span>}
              {itemName}
            </div>
            <div className="description">{description}</div>
            
          </div>
        </Link>
      </div>
  );
};

export default Card;
