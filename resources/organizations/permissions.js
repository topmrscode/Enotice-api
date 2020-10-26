const { getStatusText, UNAUTHORIZED } = require("http-status-codes");
const { isConnected } = require("../../helpers/authentication");

const checkConnectedUser = ({ ctx }) => {
  if (!isConnected(ctx)) {
    return ctx.throw(UNAUTHORIZED, getStatusText(UNAUTHORIZED));
  }
  return true;
};

const logout = checkConnectedUser;

exports.permissions = {
  logout,
};
