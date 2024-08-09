const Joi = require("joi");
const { default: mongoose } = require("mongoose");

// Schema
const subCategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  }
}, { timeseries: true })

// Model
exports.SubCategory = mongoose.model('SubCategory', subCategorySchema);

// Validation category
exports.validateSubCategory = (obj) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(32).label('name'),
    categoryId: Joi.string().required().label("category id"),
  })

  return schema.validate(obj);
}