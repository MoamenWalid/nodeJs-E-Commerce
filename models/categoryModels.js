const Joi = require("joi");
const { Schema, default: mongoose } = require("mongoose");

// Schema
const categorySchema = new Schema({
  name: String,
  slug: String,
  image: String
}, { timestamps: true })

// Model
exports.Category = mongoose.model('Category', categorySchema);

// Validation category
exports.validateCateogry = (obj) => {
  const schema = Joi.object({
    name: Joi.string().required().trim().min(3).max(32).label('name')
  })

  return schema.validate(obj);
}