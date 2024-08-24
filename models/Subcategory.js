import mongoose from "mongoose";

const name = {
  type: String,
  required: [true, "Category name required"],
  trim: true,
  unique: [true, "Category name must be unique"],
  minlength: [2, "Too short category name"],
  maxlength: [32, "Too long category name"]
}

const slug = {
  type: String,
  lowercase: true
}

const subCategorySchema = new mongoose.Schema({
  name,
  slug,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category required"],
  }
}, { timestamps: true })

// Subcategory model
const SubCategory = mongoose.model('Subcategory', subCategorySchema);

export { SubCategory };