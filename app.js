const express = require("express");
const app = express();
const taskRouter = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middlewares/notfound");
const errorHandler = require("./middlewares/error-handler");

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/tasks", taskRouter);
app.use("/api/products", require("./routes/products"));

// error handler
app.use(notFound);
app.use(errorHandler);

// start server
const port = 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`server runs on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
