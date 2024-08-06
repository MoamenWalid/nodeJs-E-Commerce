const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Connected to MongoDB! ^_^');
  } catch (error) {
    console.error(`Database Error: ${ error.message }`);
  }
}

module.exports = { connectToDB };