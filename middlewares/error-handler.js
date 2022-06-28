const errorHandlerMiddleWare = (err, req, res, next) => {
  console.log(err);
  // res.status(500).json({ msg: err.message });
  res.status(500).json({ msg: "Something went wrong, pls try again later." });
};

module.exports = errorHandlerMiddleWare;
