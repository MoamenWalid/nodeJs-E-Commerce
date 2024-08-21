import mongoose from "mongoose";

const name = {
  type: String,
  required: [true, "Category required"],
  trim: true,
  unique: [true, "Category must be unique"],
  minlength: [3, "Too short category name"],
  maxlength: [32, "Too long category name"]
}

const slug = {
  type: String,
  lowercase: true
}

// Category Schema
const categorySchema = new mongoose.Schema({
  name,
  slug
}, { timestamps: true })

// Category model
const Category = mongoose.model('Category', categorySchema);

export { Category };