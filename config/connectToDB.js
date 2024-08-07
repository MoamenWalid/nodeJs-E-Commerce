const mongoose = require('mongoose');

const connectToDB = async () => {
  await mongoose.connect(process.env.DB_URI);
  console.log('Connected to MongoDB! ^_^');
}

module.exports = { connectToDB };