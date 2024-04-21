const app = require('./App');

require('dotenv').config({ path: '.env' });

//require('dotenv').config({ path: '../.env' });

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});