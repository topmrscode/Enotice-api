const organizations = require("./organizations");
const sessions = require("./sessions");
const products = require("./products");

module.exports = (app) => {
  app.context.permissions = {};
  app.context.controllers = {};
  app.context.models = {};
  app.context.routes = {};
  app.context.validations = {};
  organizations(app);
  sessions(app);
  products(app);
};
