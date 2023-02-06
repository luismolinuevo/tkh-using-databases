import { Sequelize, DataTypes } from "sequelize";

//Just runs the function immediately
(async function () {
  //Sets up the connection to our database using Sequelize
  const sequelize = new Sequelize("database", "username", "password", {
    host: "host-url",
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
      },
    },
  });

  try {
    //Establishes the connection to the database...in this case, Planetscale
    await sequelize.authenticate();

    //Defines a model using Sequelize
    const Todo = sequelize.define("Todo", {
      // Model attributes are defined here
      // ID is a unique way to label the data in our table
      id: {
        //Defines the id attribute as a number
        type: DataTypes.INTEGER,
        //makes sure the id gets increased each time we enter data into this table
        autoIncrement: true,
        //If this table was to be used with relationships with other tables, we would use the primary key. A TABLE SHOULD ALWAYS HAVE A PRIMARY KEY. The primary key could be a alpha numeric type or just a numeric type
        primaryKey: true,
      },
      name: {
        //Defines the name attribute as a string
        type: DataTypes.STRING,
      },
    });

    //After the creation of the models, We have to tell Sequelize that this table (and any other tables) needs to be created.
    await sequelize.sync({ force: true });

    //This defines the data that's going to be inserted into the Todo table
    const newTodo = Todo.build({
      name: "clean the dog",
    });

    //.save pushes the data to our database and our database saves the data as a new row
    await newTodo.save();

    //.findAll gets ALL the data that is in this table
    const listOfTodos = await Todo.findAll();

    //Lists all the data in the todo table
    console.log(listOfTodos);
  } catch (err) {
    //If something fails, the error would be printed out.
    console.log(err);
  }
})();
