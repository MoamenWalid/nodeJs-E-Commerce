import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import connectToDB from './config/connectToDB.js';

// Connect to DB
connectToDB();

const app = express();

/*** Middlewares ***/
// Morgan
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// Do parse to (req body)
app.use(express.json());

// routes
app.all('*', (req, res) => {
  console.log(`Not found this route | ${ req.route }`);
  
})

// Run server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App Running on port ${ PORT }`);
})