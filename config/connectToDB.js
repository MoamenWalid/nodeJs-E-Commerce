import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected successfully ^_^`);
  } catch (err) {
    console.error(`Database Error: ${ err.message }`);
    process.exit(1);
  }
}

export default connectToDB;