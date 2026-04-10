exports.errorHandler = (err, req, res, next) => {
  const status = err.statusCode;
  const message = err.message || "Something went wrong";

  res.status(status).json({ message: message, success: false });
  next();
};
