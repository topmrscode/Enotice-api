const Router = require("@koa/router");
const { initializeRoute } = require("../../helpers/router");
const { validations } = require("./validations");
const { permissions } = require("./permissions");
const { controller } = require("./controller");

module.exports = (app) => {
  const router = new Router({ prefix: "/organizations" });
  const jwt = app.context && app.context.state && app.context.state.jwt;

  /**
   * Create a new organization
   */
  initializeRoute(router, {
    method: "post",
    validation: validations.create,
    controller: controller.create,
  });
  /**
   * Login
   */
  initializeRoute(router, {
    method: "post",
    slug: "login",
    validation: validations.login,
    controller: controller.login,
  });
  /**
   * Logout current organization
   */
  initializeRoute(router, {
    method: "get",
    slug: "logout",
    permission: permissions.logout,
    controller: controller.logout,
    jwt,
  });

  /**
   * get me
   */
  initializeRoute(router, {
    method: "get",
    slug: "me",
    permission: permissions.fetchMe,
    controller: controller.fetchMe,
    jwt,
  });

  app.use(router.routes()).use(router.allowedMethods());
};
