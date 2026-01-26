require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

//check

const pool = require('./src/config/db');

pool.query('SELECT 1')
  .then(() => console.log('DB test query successful'))
  .catch(err => console.error('DB connection failed', err));


app.listen(PORT, () => {
  console.log(`StreamForge running on port ${PORT}`);
});
