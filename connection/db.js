const mongoose = require("mongoose");
const url = 'mongodb://0.0.0.0:27017/crudtask';


mongoose.connect(url).then(() => {
    console.log("Database Connected");
  })
  .catch((error) => console.log("Error while connecting to the database:", error));

// try {
//   mongoose.connect(url);
//   console.log("Database Connected");
// } catch (error) {
//   console.log("Error while connecting to the database:", error);
// }