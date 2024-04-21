import React, { useContext ,useEffect, useState} from 'react';
import UserContext from '../Auth/UserContext';
import Header from '../Header';
import Footer from '../Footer';
import "../../assets/css/Dashboard.css";
import Card from './Card';
import CardLong from './CardLong';
import { FaRunning } from 'react-icons/fa';
import CardSmall from './CardSmall';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Link } from 'react-router-dom';
Chart.register(ArcElement);
Chart.register(ChartDataLabels);

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [MoodStreak, setMoodStreak] =useState(0);
  const [currentMoodStats, setCurrentMoodStats] =useState("");
  const [desiredMoodStats,setDesiredMoodStats] = useState("")
  const [similarUsers,setSimilarUsers] = useState(0);
  const [popularactivityfreq, setPopularactivityfreq]= useState(0);
  const [popularDesiredMood,setpopulardesiredmood] = useState('');
  const [currentMoodsArray, setcurrentMoodsArray] = useState();
  const [currentMoodsCountArray,setcurrentMoodsCountArray]=useState();
  const [desiredMoodsArray, setdesiredMoodsArray] = useState();
  const [desiredMoodsCountArray,setdesiredMoodsCountArray]=useState();
  const [popularActivity, setPopularActivity] = useState('');
  const [categories, setCategories] = useState();
  // saved / liked recommendations
  const [savedRecommendations, setSavedRecommendations] = useState();

  useEffect(() => {
    // Function to make API call
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('https://moodbackend.onrender.com/stats', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            }          
          });
        
        if (!response.ok) {
          
          throw new Error('Failed to fetch data');
        }

        
        const {message, responseData} = await response.json();
        const moodbooststreak_res = responseData.moodbooststreak;
        const popularactivityfreq_res = responseData.popularactivityfreq;
        const currentMoodstats_res = responseData.currentMoodstats;
        const desiredMoodstats_res = responseData.desiredMoodstats;
        const similarUsers_res = responseData.similarUsers;
        const popularDesiredMood_res = responseData.populardesiredmood;
        
        // console.log(responseData)

        setMoodStreak(moodbooststreak_res)
        setCurrentMoodStats(currentMoodstats_res)
        setDesiredMoodStats(desiredMoodstats_res)
        setSimilarUsers(similarUsers_res)
        setPopularactivityfreq(popularactivityfreq_res)
        setpopulardesiredmood(popularDesiredMood_res)
        setPopularActivity(responseData.popularActivities)
        setSavedRecommendations(responseData.saved_recs);
       
        // console.log(responseData.saved_recs[0].category)

        if (responseData.saved_recs) {
          const uniqueCategories = [...new Set(responseData.saved_recs.map(rec => rec.category))];
          setCategories(uniqueCategories);
          // console.log(responseData.saved_recs)
        }
  


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData function
    fetchData();

  }, []);
  

  let Message=false;

    const userData = {
        labels: currentMoodsArray,
        datasets: [
          {
            label: 'User mood trends',
            data: currentMoodsCountArray,
            backgroundColor: ['#4a4e69', '#9a8c98', '#c9ada7','#8a817c','#cbc0d3','#d0b8ac'],
            hoverOffset: 4
          },
        ],
      };  
      const desiredData = {
        labels: desiredMoodsArray,
        datasets: [
          {
            label: 'User mood trends',
            data:desiredMoodsCountArray,
            backgroundColor: ['#4a4e69', '#9a8c98', '#c9ada7','#8a817c','#cbc0d3','#d0b8ac'],
            hoverOffset: 4
          },
        ],
      };  

      // Conditional rendering for parsing data
  useEffect(() => {
    if (currentMoodStats) {
      const moodObjects = currentMoodStats.split('},{').map((moodString, index, array) => {
        // Reconstruct the object format for each mood

        if (index === 0 ) {
          if (array.length>1)
          {
          // If it's the first element, add '{' at the beginning
          return JSON.parse(moodString + '}');
          }
          else{
            return JSON.parse(moodString);
          }
        } else if (index === array.length - 1) {
          // If it's the last element, add '}' at the end
          return JSON.parse('{' + moodString);
        } else {
          // For all other elements, add '{' at the beginning and '}' at the end
          return JSON.parse('{' + moodString + '}');
        }
      });

      // Extract mood counts and moods into separate arrays
      const currentmoodCounts = moodObjects.map(mood => mood.mood_count);
      const currentmoods = moodObjects.map(mood => mood.Mood);

      setcurrentMoodsCountArray(currentmoodCounts);
      setcurrentMoodsArray(currentmoods);
    }
  }, [currentMoodStats]);

  useEffect(() => {
    if (desiredMoodStats) {
      const desiredmoodObjects = desiredMoodStats.split('},{').map((moodString, index, array) => {
        // Reconstruct the object format for each mood
        if (index === 0 ) {
          if (array.length>1)
          {
          // If it's the first element, add '{' at the beginning
          return JSON.parse(moodString + '}');
          }
          else{
            return JSON.parse(moodString);
          }
        } else if (index === array.length - 1) {
          // If it's the last element, add '}' at the end
          return JSON.parse('{' + moodString);
        } else {
          // For all other elements, add '{' at the beginning and '}' at the end
          return JSON.parse('{' + moodString + '}');
        }
      });

      // Extract mood counts and moods into separate arrays
      const desiredmoodCounts = desiredmoodObjects.map(mood => mood.mood_count);
      const desiredmoods = desiredmoodObjects.map(mood => mood.Mood);

      setdesiredMoodsCountArray(desiredmoodCounts);
      setdesiredMoodsArray(desiredmoods);
    }
  }, [desiredMoodStats]);


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


  return (
    <> 
      <Header 
        title="" 
        subtitle="" 
        name={user && `Hi ${user}`} 
        pageTitle="DASHBOARD"
      />
      <div className=''>
        <div className="card-sections-dash">  
          <CardSmall 
            itemName="Popular Desired Mood"
            description={popularDesiredMood}
            bgcolors="small-card-colors1"
            textcolor="small-card1"
          />
          <CardSmall 
            itemName="Most Popular Activity"
            description={popularactivityfreq}
            bgcolors="small-card-colors3"
            textcolor="small-card1"
          />
          <CardSmall 
            itemName="MoodBoost Streak"
            description={MoodStreak}
            bgcolors="small-card-colors4"
            textcolor="small-card3"
          />

          <CardSmall 
            itemName="Similar Users"
            description={similarUsers}
            bgcolors="small-card-colors2"
            textcolor="small-card3"
          />

        </div>
      </div>
      
        <div className=''>
        
          <div className="card-sections-dash my-color">  
              <div className="DesiredTrendContainer">
                <p className="">Mood Trends</p>
                  {/* <div className="MoodTrend">  */}
                  <div className="DesiredTrend"> 
                    <Pie data={userData} options={chartOptions} />
                  </div> 
              </div>

              <div className="DesiredTrendContainer">
                <p className="">Desired Mood Trends</p>
                  <div className="DesiredTrend">
                    <Pie data={desiredData} options={chartOptions}/> 
                  </div>
              </div>
          </div>
        </div>
        

        <div className="card-sections-dash">  
          <CardLong 
            icon={<FaRunning />}
            itemName="Popular Activities"
            description={popularActivity && popularActivity.map((activity, index) => (
              <div key={index}>
                <h6>{activity}</h6>
              </div>  
            ))}

          />
        </div>
        <div className="card-sections-dash">  
          <CardLong 

            icon={<FaRunning />}
            itemName="Suggested Recommendations You Have Tried"
            //map the saved recommendations
            description={
               categories && categories.map((cat, catIndex) => (
                 <div key={catIndex}>
                   <h3>{cat}</h3>
                   {savedRecommendations && savedRecommendations
                     .filter((rec) => rec.category === cat)
                     .map((rec, recIndex) => (
                       <ul key={recIndex}>
                         <li>{rec.name}</li>
                       </ul>
                     ))
                   }
                 </div>
               ))
             }   
          />
        </div>
        <div className="card-sections-dash">  
          <div className='button-section my-color'>
            <Link to={"/moodboost"} >
              <button className='button' type='submit'>
                <span>MoodBoost</span>
              </button>
            </Link>
          </div>
        </div>
      <Footer/>        
    </> 
  );
};

export default Dashboard;