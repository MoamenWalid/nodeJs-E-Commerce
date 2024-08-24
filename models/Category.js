import mongoose from "mongoose";

const name = {
  type: String,
  required: [true, "Category name required"],
  trim: true,
  unique: [true, "Category name must be unique"],
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