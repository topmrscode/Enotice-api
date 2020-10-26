const jwtTool = require('jsonwebtoken');
const { NOT_FOUND } = require('http-status-codes');

const initializeRoute = (
  router,
  { jwt, slug = '', method = 'get', validation = null, permission = null, controller = null }
) => {
  const actions = async (ctx, next) => {
    /**
     * Could not make work the unicity properly
     * https://github.com/koajs/router/issues/34
     */
    if (!ctx.state._matchedRoute) {
      ctx.state._matchedRoute = true;
      permission && permission({ ctx, jwtTool });
      validation && (await validation({ ctx }));
      if (!controller) {
        ctx.response.status = NOT_FOUND;
        ctx.body = 'Endpoint not found';
        return next();
      }
      await controller({ ctx, jwtTool });
    }
    return next();
  };
  if (jwt) {
    return router[method](`/${slug}`, jwt, actions);
  }
  return router[method](`/${slug}`, actions);
};

exports.initializeRoute = initializeRoute;
