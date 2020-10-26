require("dotenv-flow").config();

const koa = require("koa");
const compress = require("koa-compress");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const jwt = require("./middlewares/jwt");
const responseHandler = require("./middlewares/response-handler");
const mongoService = require("./services/mongo");

const resources = require("./resources");

const app = new koa();

/** Middleware stack */
app.use(compress());
app.use(bodyParser());
app.use(jwt());
app.use(cors({ credentials: true }));
/** Has to be the last middleware */
app.use(responseHandler());

resources(app);

if (!module.parent) {
  const APP_PORT = process.env.APP_PORT;
  mongoService.connect();
  app.listen(APP_PORT);
  console.log(`listening on port ${APP_PORT}`);
}

module.exports = app;
