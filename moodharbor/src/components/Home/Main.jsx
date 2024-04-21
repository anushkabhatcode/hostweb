import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FaSmile } from "react-icons/fa";
import { Twemoji } from 'react-emoji-render';
import { useState } from 'react';
import {useEffect} from 'react';

import "../../assets/css/Dashboard.css";
import "../../assets/css/Main.css";
import CardHome from './CardHome';
Chart.register(ArcElement);
Chart.register(ChartDataLabels);

import image1 from "../../assets/images/sand.jpg";
import image2 from "../../assets/images/plant.jpg";
import image3 from "../../assets/images/redlights.jpg";
import image4 from "../../assets/images/lights.jpg";
import image5 from "../../assets/images/lights2.jpg";
import image6 from "../../assets/images/lilly.jpg";
import TodayDate from './TodayDate';
import EmojiGrid from './EmojiGrid';
import ActiveEmojiGrid from './ActiveEmojiGrid';
import DesireEmojiGrid from './DesireEmojiGrid';
import LogMood from '../LogMood';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
const images = [image1, image2, image3, image4, image5, image6];

function Main(){

  const [activityResponse,setactivityResponse] = useState(false)
  const [desiredMoodResponse,setdesiredMoodResponse] = useState(false)
  const [currentMoodResponse,setcurrentMoodResponse] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentMoodSuccess, setCurrentMoodSuccess] = useState(null);
  const [desiredMoodSuccess, setDesiredMoodSuccess] = useState(null);

  const navigate = useNavigate();
  
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const handleEmojiSelection = (emoji) => {
    setSelectedEmoji(emoji); // Update the selected emoji state 
    
  };

  const [selectedActivityEmoji, setSelectedActivityEmoji] = useState(null);
  const handleActivityEmojiSelection = (emoji) => {
    setSelectedActivityEmoji(emoji); // Update the selected emoji state 
    
  };

  const [selectedDesiredEmoji, setSelectedDesiredEmoji] = useState(null);
  const handleDesiredEmojiSelection = (emoji) => {
    setSelectedDesiredEmoji(emoji); // Update the selected emoji state 
    // console.log(selectedDesiredEmoji)
    
  };

  const [textValue, setTextValue] = useState('');
  const handleInputChange = (event) => {
    setTextValue(event.target.value); // Update the state with the new value
  };

  const [quoteData, setQuoteData] = useState({
    quote: '',
    author: '',
  });

  // fetch quotes
  useEffect(() => {
    fetch('http://localhost:4000/quotes')
      .then(response => response.json())
      .then(data => {
        // select one quote at random between 0 and data.length
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuoteData(data[randomIndex]);
        
        sessionStorage.setItem('quote', data[randomIndex].quotes);
        sessionStorage.setItem('author', data[randomIndex].author);
      })
      .catch(error => {
        console.error('Error fetching quotes:', error);
      });
  }, []);




  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page if token not found
      navigate('/login');
    }
  }, []);


    let Message=false;

    const userData = {
        labels: ['Happy', 'Sad', 'Feeling Solitary'],
        datasets: [
          {
            label: 'User mood trends',
            data: [50,60,70],
            backgroundColor: ['#4a4e69', '#9a8c98', '#c9ada7'],
            hoverOffset: 4
          },
        ],
      };  
      const desiredData = {
        labels: ['Happy', 'Inspired', 'Confident'],
        datasets: [
          {
            label: 'User mood trends',
            data:[40,60,90],
            backgroundColor: ['#4a4e69', '#9a8c98', '#c9ada7'],
            hoverOffset: 4
          },
        ],
      };  

     const showMessage=()=>{
        const checkData = userData.datasets[0].data;
        const num=checkData.length;
        if (num===0){
        Message=false;     
        }
        else{
        Message=true;       
        }
        return Message;
     }

     const chartOptions = {
      
        plugins: {
            datalabels: {
                color: '#fff', // Font color of the labels
                font: {
                    size: 14 // Font size of the labels
                },
                formatter: (value, context) => {
                    // console.log("chart options");
                    return context.chart.data.labels[context.dataIndex]; // Display label text
                }
            }
        }
    };


    const LogCurrentMood = async (event) => {
      event.preventDefault();

      if (selectedEmoji !== null) {
        try {
          // Retrieve JWT token from local storage
          const token = localStorage.getItem('token');
          
    
          const response = await fetch('http://localhost:4000/logmood/currentmood', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
            },
            body: JSON.stringify({
              // Include any data you want to send with the request
              currentMood:selectedEmoji.name
            })
            
          });
    
          if (response.ok) {
            // console.log("Successfully logged the current mood!!")
            setcurrentMoodResponse(true)
            setCurrentMoodSuccess("Current Mood Logged!");
          } else {
            const errorData = await response.json();
            console.error('Failed to log the current mood:', errorData.error);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    const LogDesiredMood = async (event) => {
      event.preventDefault();

      if (selectedDesiredEmoji !== null) {
        try {
          // Retrieve JWT token from local storage
          const token = localStorage.getItem('token');
    
          const response = await fetch('http://localhost:4000/logmood/desiredmood', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
            },
            body: JSON.stringify({
              // Include any data you want to send with the request
              desiredMood:selectedDesiredEmoji.name
            })
            
          });
    
          if (response.ok) {
            // console.log("Successfully logged the desired mood!!")
            setdesiredMoodResponse(true)
            setDesiredMoodSuccess("Desired Mood Logged!");
          } else {
            const errorData = await response.json();
            console.error('Failed to log the desired mood:', errorData.error);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    const LogUserActivity = async (event) => {
      event.preventDefault();



      if (selectedActivityEmoji !== null) {
        try {
          // Retrieve JWT token from local storage
          const token = localStorage.getItem('token');
    
          const response = await fetch('http://localhost:4000/activities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
            },
            body: JSON.stringify({
              // Include any data you want to send with the request
              Activity:selectedActivityEmoji.name,
              Note:textValue //Note part has not been added yet

            })
            
          });
    
          if (response.ok) {
            // console.log("Successfully logged the user activity!!")
            setactivityResponse(true)
            setSuccessMessage("Logged successfully! Checkout your stats in MoodBoost!");
            // setTimeout(() => {
            //   navigate('/moodboost');

            // }, 3000);

          } else {
            const errorData = await response.json();
            console.error('Failed to log the user activity:', errorData.error);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

       
    return(
      <div className="All_Content">
        
        <div className="quote-sections"> 
          {/* {images.map((image, index) => (  */}
          <CardHome
            // key={index}
            images = {images}
            icon={<FaSmile />}
            itemName="Your Daily Refresh Quote"
            description={quoteData.quotes}
            author={quoteData.author}
          />
          {/* ))} */}
        </div>
        <div className="quote-sections"> 
          <TodayDate /> 
        </div>
        <div className="quote-sections title"> 
            <h3 className='title'>HOW DO YOU FEEL?</h3>
        </div>
         
        <div className="quote-sections" id="emoji-grid"> 
          <EmojiGrid onSelectEmoji={handleEmojiSelection} />
        </div>

        {/* display the selected emoji */}
        {selectedEmoji && (
        <div className='quote-sections selected-emoji'>
          Mood: {selectedEmoji.symbol}

          <div className='button-section'>
            <button className='button' type='button' onClick={LogCurrentMood}>
              <span>Log Mood</span>
            </button>
          </div>

          <Typography variant="body2" className="success-message" style={{ color: 'green', marginTop: '10px' }}>
            {currentMoodSuccess}
          </Typography>
        </div>
      )}

          
      

        <div className="quote-sections title"> 
            <h3 className='title'>DESIRED MOOD?</h3>
        </div>
        <div className="quote-sections" id="desired-emoji-grid"> 
        <DesireEmojiGrid  onSelectEmoji={handleDesiredEmojiSelection}/>
        
        </div>
        
        {selectedDesiredEmoji && (
        <div className='quote-sections selected-emoji'>
          <span>Mood: {selectedDesiredEmoji.symbol}</span>

          <div className='button-section'>
            <button className='button' type='button' onClick={LogDesiredMood}>
              <span>Desired Mood</span>
            </button>
          </div>

          <Typography variant="body2" className="success-message" style={{ color: 'green', marginTop: '10px' }}>
            {desiredMoodSuccess}
          </Typography>
        </div>
        
      )}

          
        <div className="quote-sections title"> 
          <h3 className='title'>WHAT HAVE YOU BEEN UP TO?</h3>
        </div>
        <div className="quote-sections" id="activity-grid"> 
          <ActiveEmojiGrid onSelectEmoji={handleActivityEmojiSelection}/>
        </div>

        {/* display the selected desired mood */}
        {selectedActivityEmoji && (
          <div className='quote-sections selected-emoji'>
            Activity: {selectedActivityEmoji.symbol}
          </div>
        )}

          <div className='button-section'>
            <input type="text" className='form-group2' onChange={handleInputChange}/>
            <button className='button' type='button' onClick={LogUserActivity}>
            
              <span>Add Note</span>
            </button>
          </div>

      {activityResponse  && desiredMoodResponse && currentMoodResponse && (
        <div className='button-section quote-sections'>
            <Link to={"/moodboost"} >
              <button className='button-large' type='button'>
                <span>MoodBoost</span>
              </button>
            </Link>

            <Typography variant="body2" className="success-message" style={{ color: 'green', marginTop: '10px' }}>
            {successMessage}
          </Typography>
          
        </div>
        
      )}

      
      </div>
      );


}

export default Main;

