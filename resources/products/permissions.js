const { getStatusText, UNAUTHORIZED } = require("http-status-codes");
const { isConnected } = require("../../helpers/authentication");

const checkConnectedUser = ({ ctx }) => {
  if (!isConnected(ctx)) {
    return ctx.throw(UNAUTHORIZED, getStatusText(UNAUTHORIZED));
  }
  return true;
};

const create = checkConnectedUser;
const update = checkConnectedUser;
const remove = checkConnectedUser;
const findOne = checkConnectedUser;
const list = checkConnectedUser;

exports.permissions = {
  create,
  update,
  remove,
  findOne,
  list,
};
