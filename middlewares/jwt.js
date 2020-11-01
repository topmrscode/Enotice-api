const jwt = require("koa-jwt");

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

  const session = await Session.findOne({ _id: token });
  if (!session) {
    return next();
  }
  ctx.state.token = token;
  ctx.state.organization = await Organization.findOne({
    _id: session.organizationId,
  });
  ctx.state.jwt = jwt({ secret });

  return next();
};
