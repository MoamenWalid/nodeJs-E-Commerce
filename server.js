const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const morgan = require('morgan');
const { connectToDB } = require('./config/connectToDB');
const { createCategory } = require('./controllers/categoryController');
const { routerCategory } = require('./routes/categoryRoute');
const { ApiError } = require('./middlewares/apiError');
const { errorHandling } = require('./middlewares/error');

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

// All routes not found
app.all('*', (req, res, next) => {
  next(new ApiError(`Cant find this route: ${ req.originalUrl }`, 404));
})

// Error handling
app.use(errorHandling);

let server;

// Events => listen => calback(err)
process.on('unhandledRejection', err => {
  console.log(`UnhandledRejection Errors: ${ err }`);
  if (server) {
    server.close(() => {
      process.exit(1);
    })
  }
})

// Running the server
const PORT = process.env.PORT || 8000;
server = app.listen(PORT, () => {
  console.log(`App running in ${ process.env.NODE_ENV } on port ${ PORT }`);
})