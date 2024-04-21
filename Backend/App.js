var express = require('express')
require('dotenv').config({ path: '.env' });
var app = express()

// Import route handlers
const moodRoutes = require('./API/moodsapi.js');
const userRoutes = require('./API/userapi.js');
const quotesRoutes = require('./API/quotesapi.js');
const currentUserRoutes = require('./API/currentmoodapi.js');
const desiredUserRoutes = require('./API/desiredmoodapi.js');
const userActivity = require('./API/useractivityapi.js')
const getRecommendations = require('./API/getrecommendationsapi.js')
const getStats = require('./API/getstats.js')
const savRec = require('./API/saverecommendations.js')
const similarUsers = require('./API/similarusers')
const contact = require('./API/contapi.js')

const cors = require('cors');
app.use(cors());

try{
app.use('/users', userRoutes);
} catch(err){

    console.error(err);
}
app.use('/moods', moodRoutes);
app.use('/quotes',quotesRoutes);
app.use('/logmood',currentUserRoutes);
app.use('/logmood',desiredUserRoutes)
app.use('',userActivity)
app.use('',getRecommendations)
app.use('',getStats)
app.use('',savRec)
app.use('/similarusers',similarUsers)
app.use('',contact)



module.exports = app;

