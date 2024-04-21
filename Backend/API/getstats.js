const express = require('express'); 
const { authenticateToken } = require('./authapi.js');
const router = express.Router();
const sequelize = require('../database.js')
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/stats', authenticateToken, async (req, res) => {
  try {
    // Extract data from the request body and JWT token from headers
    const username = req.username; // Extract username from decoded token
    const sessionId = req.sessionId;
    const results = await sequelize.query('EXEC getStats @sessionID = :sessionID, @username = :username', {
        replacements: {
          sessionID: sessionId,
          username: username
        },
        type: sequelize.QueryTypes.SELECT
      });

   const res_json = results[0].combined_json;
   console.log("Results:",res_json)

   // Parse the combined JSON string
   const combinedData = JSON.parse(res_json);
   // Extract additional_data object
   const additionalData = combinedData.additional_data;
   let usernames = combinedData.usernames;
   let saved_recs= combinedData.saved_recs;
   const moodbooststreak = additionalData.moodbooststreak;
   const popularactivityfreq=additionalData.popularActivitiesFreq;
   const populardesiredmood=additionalData.populardesiredmood;
   const popularActivities =additionalData.popularActivity.split(',');
   let usernamesArray =[]
   console.log(usernames)


   if (usernames === 'None recorded'){
       usernames =[]
    
   }

   else{
        usernamesArray = usernames.map(obj => obj.username);

   }
   if (saved_recs === 'None recorded'){
    saved_recs =[]
 
  }



   

   console.log(popularActivities)

   const results_stats = await sequelize.query('EXEC getmoodstats  @username = :username', {
    replacements: {
    username: username
    },
    type: sequelize.QueryTypes.SELECT
  });
  
  const dynamicKey = Object.keys(results_stats[0])[0];

// Get the JSON string corresponding to the dynamic key
  const jsonString = results_stats[0][dynamicKey];

// Parse the JSON string to get the object
  const jsonObject = JSON.parse(jsonString);

// Access the properties of the object
  const currentMoods = jsonObject.current_moods;
  const desiredMoods = jsonObject.desired_moods;

  const responseData = {
    moodbooststreak: moodbooststreak,
    popularactivityfreq: popularactivityfreq,
    currentMoodstats: currentMoods,
    desiredMoodstats: desiredMoods,
    similarUsers:usernames.length,
    populardesiredmood:populardesiredmood,
    popularActivities:popularActivities,
    userNames : usernamesArray,
    saved_recs : saved_recs

  };
  

  console.log(responseData)


  res.status(200).json({ message: 'Logs provided successfully' ,responseData:responseData});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;