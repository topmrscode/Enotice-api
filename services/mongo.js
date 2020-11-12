const mongoose = require("mongoose");

const connect = () => {
  const DB_HOST = process.env.DB_HOST;
  const DB_PORT = process.env.DB_PORT ? `:${process.env.DB_PORT}` : "";
  const DB_NAME = process.env.DB_NAME;
  const DB_USER = process.env.DB_USER ? process.env.DB_USER : "";
  const DB_PASSWORD = process.env.DB_PASSWORD;

  let DB_AUTH_STRING = "";
  if (DB_USER) {
    DB_AUTH_STRING = `${DB_USER}:${DB_PASSWORD}@`;
  }
  const connectionString = `mongodb://${DB_AUTH_STRING}${DB_HOST}${DB_PORT}/${DB_NAME}`;
  const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  return mongoose.connect(connectionString, mongoOptions);
};

exports.connect = connect;
