import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import connectToDB from './config/connectToDB.js';
import { categoryRoute } from './routes/categoryRoute.js';
import { ApiError } from './utils/ApiError.js';
import { globalError } from './middlewares/globalError.js';

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
app.use('/api/categories', categoryRoute);
app.all('*', (req, _, next) => {
  next(new ApiError(`Not found this route ${ req.originalUrl }`, 400));
})

// Global error handling
app.use(globalError);

// Run server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App Running on port ${ PORT }`);
})

// Events on unHandleRejections
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${ err.name } | ${ err.message }`);
  server.close(() => {
    console.log(`Shutting down...`);
    
    process.exit(1);
  })
})