import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Dashboard.css';

const MoodMessage = ({ user, mood, desiredMood }) => {
  return (
    <div>
      {mood === "No mood logged today" ? (
        <p>No mood logged today. <Link to="/home" id='custom_links'> Log Mood
            </Link></p>
      ) : (
        <p>
          {user && mood && desiredMood && `Hi ${user}! Today, you are ${mood}. Check out recommendations to make you ${desiredMood}`}
        </p>
      )}
    </div>
  );
};

export default MoodMessage;
