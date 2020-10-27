const Router = require("@koa/router");
const { initializeRoute } = require("../../helpers/router");
const { validations } = require("./validations");
const { permissions } = require("./permissions");
const { controller } = require("./controller");

module.exports = (app) => {
  const router = new Router({ prefix: "/products" });
  const jwt = app.context && app.context.state && app.context.state.jwt;

  /**
   * Create a new product
   */
  initializeRoute(router, {
    method: "post",
    permission: permissions.create,
    validation: validations.create,
    controller: controller.create,
    jwt,
  });

  /**
   * edit a new product
   */
  initializeRoute(router, {
    method: "put",
    slug: ":id",
    permission: permissions.update,
    validation: validations.update,
    controller: controller.update,
    jwt,
  });

  /**
   * delete a new product
   */
  initializeRoute(router, {
    method: "delete",
    slug: ":id",
    permission: permissions.remove,
    validation: validations.remove,
    controller: controller.remove,
    jwt,
  });

  /**
   * FindOne
   */
  initializeRoute(router, {
    method: "get",
    slug: ":id",
    permission: permissions.findOne,
    validation: validations.findOne,
    controller: controller.findOne,
    jwt,
  });

  /**
   * FindOne / public
   */
  initializeRoute(router, {
    method: "get",
    slug: ":id/public",
    validation: validations.findOnePublic,
    controller: controller.findOnePublic,
    jwt,
  });

  /**
   * list by organizationId
   */
  initializeRoute(router, {
    method: "get",
    permission: permissions.list,
    controller: controller.list,
    jwt,
  });

  app.use(router.routes()).use(router.allowedMethods());
};
