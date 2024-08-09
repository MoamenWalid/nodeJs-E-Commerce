const { default: mongoose } = require("mongoose");
const { ApiError } = require("./apiError");

exports.validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError('invalid id', 400));
  }

  next();
}