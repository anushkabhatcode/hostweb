import React, { useContext, useEffect, useState } from 'react';
import UserContext from './Auth/UserContext';
import Header from './Header';
import Footer from './Footer';
import ConnectCardDetail from './Dashboard/ConnectCardDetail';
import CardSmall from './Dashboard/CardSmall';
import CardLong from './Dashboard/CardLong';
import { FaRunning } from 'react-icons/fa';
import UserCard from './UserCard';
import ConnectCard from './ConnectCard';


const Connect = () => {
  const { user } = useContext(UserContext);

  const [similarUsers, setSimilarUsers] = useState(null);

  // fetch the similar users
  useEffect(() => {
    const fetchSimilarUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://moodbackend.onrender.com/similarusers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        setSimilarUsers(data.responseData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSimilarUsers();
  }, []);

  return (
    <> 
        <Header 
            title="" 
            subtitle="" 
            name={user && `Hi ${user}`} 
            pageTitle="CONNECT"
        />

      
    <div className="card-sections-dash ">
      
      <div className=" user-card-container">  
      <h3 className='title'>Similar Users</h3>
      {similarUsers && similarUsers.map((user, userIndex) => (
        <UserCard 
          key={userIndex}
          icon=""
          itemName={`${user.username}`}
          description=""
        />
      ))}
    </div>
    </div>
        
        
        <Footer/>        
    </> 
  );
};

export default Connect;