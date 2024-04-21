import React, { useEffect, useState } from "react";

export default function TodayDate() {
 const [currentTime, setCurrentTime] = useState(new Date());

 useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
 }, []);

 const formattedDate = currentTime.toLocaleDateString();
 const formattedTime = currentTime.toLocaleTimeString();
 const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 const dayOfWeek = days[currentTime.getDay()];

 //get data user last logged mood from session storage
  const mood = sessionStorage.getItem('mood');
  const lastMoodDate = sessionStorage.getItem('lastMoodDate');
  //  console.log(mood);
  // console.log(lastMoodDate);

 return (
    <div>
      <h5>Date: {dayOfWeek} {formattedDate} {formattedTime}</h5>  
      <p>{mood && mood !== "No mood logged today" ? `Your last logged mood was ${mood} on ${lastMoodDate}` : mood}
      </p>

    </div>
 );
}
