import mongoose from "mongoose";

//Runs the function immediately
(async function () {
  try {
    //Connects to our database
    await mongoose.connect("");

    //Sets up how our todo document will look like
    const TodoSchema = mongoose.Schema({
      name: String,
    });

    //Defines the model of our todo collection
    const Todo = mongoose.model("todo", TodoSchema);

    //We create a new document with a new todo name
    const newTodo = new Todo({
      name: "Clean the dog",
    });

    //Pushes our newly created document to the database so it gets saved
    await newTodo.save();

    //Finds all the documents in the collection
    const listOfTodos = await Todo.find();

    // Prints out our documents in the collection
    console.log(listOfTodos);
  } catch (err) {
    //If something goes wrong, an error will be printed
    console.log(err);
  }
})();
