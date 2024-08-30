import mongoose from "mongoose";

const name = {
  type: String,
  required: [true, "Brand name required"],
  trim: true,
  unique: [true, "Brand name must be unique"],
  minlength: [3, "Too short Brand name"],
  maxlength: [32, "Too long Brand name"]
}

const slug = {
  type: String,
  lowercase: true
}

// Brand Schema
const brandSchema = new mongoose.Schema({
  name,
  slug
}, { timestamps: true })

// Brand model
const Brand = mongoose.model('Brand', brandSchema);

export { Brand };