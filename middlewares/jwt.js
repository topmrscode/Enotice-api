const jwt = require("koa-jwt");

const jsonwebtoken = require("jsonwebtoken");
const { Organization } = require("../resources/organizations/model");
const { Session } = require("../resources/sessions/model");
const secret = process.env.JWT_SECRET_TOKEN;

module.exports = () => async (ctx, next) => {
  let token;
  const authorization = ctx.headers.authorization;
  const authorizationToken = authorization && authorization.split(" ");
  if (authorizationToken && authorizationToken[0] === "Bearer") {
    token = authorizationToken[1];
  }
  const session = await Session.findById(token);
  if (!session) {
    return next();
  }
  ctx.state.token = token;

  ctx.state.organization = await Organization.findById(session.organizationId);
  ctx.state.jwt = jwt({ secret });

  return next();
};
