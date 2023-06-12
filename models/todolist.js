// Require the Mongoose library
const mongoose = require("mongoose");

// Define the schema for the TodoList collection
const todoListSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
});

// Create a TodoList model using the schema
const TodoList = mongoose.model("TodoList", todoListSchema);

// Export the TodoList model
module.exports = TodoList;
