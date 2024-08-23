import mongoose from "mongoose";

const connectToDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Database connected successfully ^_^`);
}

export default connectToDB;