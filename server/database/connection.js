const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true
};

mongoose
  .connect(process.env.DB_URI, options)
  .then(() => console.log("Connected to Database."))
  .catch(err => console.error("DB Connection error: " + err.message));

module.exports = mongoose.connection;
