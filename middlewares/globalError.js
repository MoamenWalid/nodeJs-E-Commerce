const globalError = (error, _, res, __) => {
  error.statusCode ||= 500;
  error.status ||= 'Error';
  if (process.env.NODE_ENV == 'development') sendErrorInDev(error, res);
  else sendErrorInProd(error, res);
}

const sendErrorInDev = (err, res) => {
  return res.status(400).json({
    error: err,
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack
  }); 
}

const sendErrorInProd = (err, res) => {
  return res.status(400).json({ 
    status: err.status,
    message: err.message,
  }); 
}

export { globalError };