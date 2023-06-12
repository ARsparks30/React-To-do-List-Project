// Require the Mongoose library
const mongoose = require("mongoose");

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/todo-list-project-db");

// Get the default connection
const db = mongoose.connection;

// Event handler for connection error
db.on("error", console.error.bind("Error connecting to db"));

// Event handler for successful connection
db.once("open", function () {
  console.log("Successfully connected to the DB");
});
