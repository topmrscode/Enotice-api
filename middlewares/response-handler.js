const {
  CODE_ENTITY_ALREADY_EXISTS,
  ERROR_ENTITY_ALREADY_EXISTS,
} = require("../helpers/errors");
const { CONFLICT } = require("http-status-codes");

module.exports = () => async (ctx, next) => {
  try {
    ctx.set("Content-Type", "application/json");
    /**  wait for the end of the request */
    await next();
    if (ctx.response.status > 299 || ctx.response.status < 200) {
      ctx.body = {
        data: null,
        error: { code: ctx.response.status, message: ctx.response.message },
      };
      return;
    }
  } catch (error) {
    if (error.code === CODE_ENTITY_ALREADY_EXISTS) {
      ctx.status = CONFLICT;
      ctx.body = {
        data: null,
        error: { code: CONFLICT, message: ERROR_ENTITY_ALREADY_EXISTS },
      };
    } else {
      ctx.status = error.status || 500;
      ctx.body = {
        data: null,
        error: { code: ctx.status, message: error.message },
      };
    }
  }
};
