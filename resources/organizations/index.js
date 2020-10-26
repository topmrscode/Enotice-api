const routes = require("./routes");

module.exports = (app) => {
  const { Organization } = require("./model");
  app.context.models.Organization = Organization;
  app.context.routes.organizations = routes(app);
};
