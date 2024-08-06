const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const morgan = require('morgan');
const { connectToDB } = require('./config/connectToDB');
const { createCategory } = require('./controllers/categoryController');
const { routerCategory } = require('./routes/categoryRoute');

// Connect with DB
connectToDB();

const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV == 'development') {
  console.log(`mode: ${ process.env.NODE_ENV }`);
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/categories', routerCategory);

// Running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running in ${ process.env.NODE_ENV } on port ${ PORT }`);
})