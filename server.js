const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const morgan = require('morgan');
const { connectToDB } = require('./config/connectToDB');

// Connect with DB
connectToDB();

const app = express();

// Middlewares
if (process.env.NODE_ENV == 'development') {
  console.log(`mode: ${ process.env.NODE_ENV }`);
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('home');
})

app.get('/about', (req, res) => {
  res.send('about');
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running in ${ process.env.NODE_ENV } on port ${ PORT }`);
})