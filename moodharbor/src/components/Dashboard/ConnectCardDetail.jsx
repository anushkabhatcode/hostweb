import React, { useState } from 'react';

// const sendLike = (name, category) => {
//   const token = localStorage.getItem('token');

//   fetch('http://localhost:4000/save', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify({name, category}),
//   })
//   .then(response => response.json())
//   .then(data => console.log('Success:', data))
//   .catch((error) => console.error('Error:', error));
// };


const ConnectCardDetail = ({ name, author, likes, category, imageUrl }) => {
  // const [isActive, setIsActive] = useState(false);
  // const handleLikeClick = () => {
  //   sendLike(title, title);
  //   setIsActive(true);  
    
  // };


  return (
    
    <div className='row'>
      {/* <div className="col-12"> */}
        <div className="card">
        <img src={imageUrl} />
          {name}
          <p>{author}</p>
            {likes && <p>{likes}</p>}
            {category && (
              <ol>
                {category.map((item, itemIndex) => (
                  <li key={itemIndex}>{item.name} - {item.category}</li>
                ))}
              </ol>
          )}
        </div>
      {/* </div> */}
      
     
    </div>
  
      
  );
};

export default ConnectCardDetail;
