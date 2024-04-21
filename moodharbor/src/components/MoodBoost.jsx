import React, { useContext,useState, useEffect } from 'react'
import Header from './Header';
import Card from './Dashboard/Card';
import CardLong from './Dashboard/CardLong';
import { FaCalendarDay, FaChartPie, FaDailymotion, FaRunning, FaSprayCan } from 'react-icons/fa';
import Footer from './Footer';
import UserContext from './Auth/UserContext';
import CardLongRec from './Dashboard/CardLongRec';
import CardDetail from './Dashboard/CardDetail';
import { Link } from 'react-router-dom';
import MoodMessage from './MoodMessage';


const MoodBoost = () => {
    const { user } = useContext(UserContext);

    const [recommendations, setRec] = useState(null);
    const [categories, setCategories] = useState(null);
    const [mood, setMood] = useState(null); 
    const [desiredMood, setDesiredMood] = useState(null);
    const [streak, setStreak] = useState(null); 
    const [quote, setQuote] = useState(sessionStorage.getItem('quote'));
    const [author, setAuthor] = useState(sessionStorage.getItem('author'));
    
    const baseUrl = '/data/'
    // fetch the logged mood
    useEffect(() => {
      const fetchCurrentMood = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:4000/logmood/currentmood', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const { currentMood, createDate } = await response.json();
          // console.log(createDate)
          //check if createDate is today
          const today = new Date();
          const date = new Date(createDate);
          sessionStorage.setItem('lastMoodDate', date.toDateString());
          if (today.getDate() !== date.getDate()) {
            setMood("No mood logged today");
            sessionStorage.setItem('mood', "No mood logged today");
            // console.log(date);
          }else{
            sessionStorage.setItem('mood', currentMood);
            // console.log(currentMood);
            setMood(currentMood);
          }
          // console.log(date)

          

          // set the streak
          if (currentMood === "Happy" || currentMood === "Confident"
          || currentMood === "Excited" || currentMood === "Content") {
            setStreak("Hooray, You're on a Happiness Streak");
          } else {
            setStreak("Time to boost your mood!");
          }


        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchCurrentMood();
    }, []);

    // Fetch the desired mood
    useEffect(() => {
      const fetchDesiredMood = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:4000/logmood/desiredmood', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const { desiredMoods } = await response.json();
          // console.log(desiredMoods);
          setDesiredMood(desiredMoods);
        } catch (error) {

          console.error('Error fetching data:', error);
        }
      };
      fetchDesiredMood();
    }, []);


    // Define useEffect to make API call on component mount
  useEffect(() => {
    // Function to make API call
    const fetchData = async () => {
      try {
        // Define your token
        const token = localStorage.getItem('token');
        
        // Make API call using fetch with authorization header
        const response = await fetch('http://localhost:4000/recommend', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
            }          
          });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        // Parse response data as JSON
        const {message, results} = await response.json();
        // console.log(message)
        
        // Set API response in state
        setRec(results);
        // console.log(results)

        // Select the categories from the recommendations
        const uniqueCategories = [...new Set(results.map(rec => rec.category))];
        setCategories(uniqueCategories);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData function
    fetchData();

  }, []);

  // save liked recommendations
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: e.target.id })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const { message } = await response.json();
      console.log(message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  

  return (
    
    <main> 
      <Header 
        title="" 
        subtitle="" 
        name={user && `Hi ${user}`} 
        pageTitle="MOODBOOST"
      />

      
      <div className="card-sections-dash">  
      <Card
        icon={<FaCalendarDay />}
        itemName="TODAY"
        description= <MoodMessage 
          user={user}
          mood={mood}
          desiredMood={desiredMood}
          />
        >

      </Card>
      
      <Card
        icon={<FaChartPie />}
          itemName="INSIGHTS"
          description={streak && `${streak}`} />
      </div>


    <div className="card-sections-dash">
      <div className="card-grid">
        {categories &&
          categories
          .filter((cat) => cat !== "Quotes")
          .map((cat, catIndex) => (
            <div key={catIndex} className="category-card">
              <CardLongRec
                icon={<FaRunning />}
                itemName="Recommendations"
                description={<h3>{cat}</h3>}
            />
                
            <div className="rec_grids">
              <div className="card-list row">
                {/* Map through each recommendation and render CardDetail */}
                {categories && recommendations
                .filter((rec) => rec.category === cat)
                .map((rec, recIndex) => (
                  <CardDetail
                    key={recIndex}
                    title={rec.name}
                    year={rec.year && `- ${rec.year}`}
                    detail={rec.description}
                    author={rec.author && rec.author}
                    imageUrl={baseUrl + rec.Image_name}
                    className="card-detail"
                    url = {rec.Link && rec.Link}
                    category={rec.category}
                  />
                ))}
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


      <div className="card-sections-dash">  
      <CardLong
        icon={<FaDailymotion />}
        itemName="Tools"
        description={quote && `${quote}`}
        author={author ? author : "Unknown"}
        className="blockquote-footer"
      />
        
      </div> 
      <div className="card-sections-dash">  
          <div className='button-section my-color'>
            <Link to={"/dashboard"} >
              <button className='button' type='submit'>
                <span>Dashboard</span>
              </button>
            </Link>
          </div>
        </div>
      
          
      <Footer/>        
    </main> 
  );
}

export default MoodBoost