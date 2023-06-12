const express = require("express"); // Import the express module
const port = 8000; // Specify the port number
const path = require("path"); // Import the path module
const app = express(); // Create an express application
const db = require("./config/mongoose"); // Import the mongoose configuration
const TodoList = require("./models/todoList"); // Import the TodoList model

app.set("view engine", "ejs"); // Set the view engine to EJS
app.set("views", path.join(__dirname, "views")); // Set the views directory
app.use(express.urlencoded()); // Enable parsing of URL-encoded data
app.use(express.static("assets")); // Serve static files from the "assets" directory

// Home route to display all todo lists
app.get("/", function (req, res) {
  TodoList.find({}) // Find all todo lists in the database
    .then((list) => {
      return res.render("home", {
        title: "To Do List Project",
        todolists: list,
      });
    }) // Render the "home" view and pass the list data to it
    .catch((err) => {
      console.log("The error in displaying", err);
    }); // Handle any errors that occur during the database operation
});

// Route to add a new todo list
app.post("/add-todo-list", function (req, res) {
  TodoList.create({
    // Create a new todo list with the provided data
    desc: req.body.todo_desc,
    label: req.body.todo_label,
    date: req.body.todo_date,
  })
    .then(() => {
      return res.redirect("back"); // Redirect the user back to the previous page
    })
    .catch((err) => {
      console.log("Error in creating content", err);
    }); // Handle any errors that occur during the database operation
});

// Route to delete a todo list
app.get("/delete-todo-list/", function (req, res) {
  let id = req.query.id; // Get the ID of the todo list to delete
  TodoList.findByIdAndDelete(id) // Find and delete the todo list with the given ID
    .then(() => {
      return res.redirect("back"); // Redirect the user back to the previous page
    })
    .catch((err) => {
      console.log("Error in deleting the content", err);
    }); // Handle any errors that occur during the database operation
});

// Start the server
app.listen(port, function (err) {
  if (err) {
    console.error.bind("Error running the express. Check the error:", err);
  } // Log any errors that occur while starting the server
  console.log(`Port ${port} is successfully running`); // Display a success message indicating that the server is running
});
