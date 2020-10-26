const mongoose = require("mongoose");


const connect = () => {
  const DB_HOST = process.env.DB_HOST;
  const DB_PORT = process.env.DB_PORT;
  const DB_NAME = process.env.DB_NAME;

  const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  return mongoose.connect(connectionString, mongoOptions);
};

exports.connect = connect;
