module.exports = (app) => {
  const { Session } = require("./model");
  app.context.models.Session = Session;
};
