require("dotenv").config();
const mongoose = require("mongoose");

const URI =
  "mongodb+srv://ewasy:taskmanagerpassword@taskmanager.fnxkq.mongodb.net/firstdb?retryWrites=true&w=majority";

const connectDB = () => {
  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
