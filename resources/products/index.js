const routes = require("./routes");

module.exports = (app) => {
  const { Product } = require("./model");
  app.context.models.Product = Product;
  app.context.routes.products = routes(app);
};
