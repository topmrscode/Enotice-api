const bcrypt = require("bcrypt");
const { CREATED, NO_CONTENT, OK } = require("http-status-codes");

const create = async ({ ctx }) => {
  const {
    request: {
      body: { email, name, password },
    },
    models: { Organization },
  } = ctx;
  const passwordCrypted = await bcrypt.hash(password, 10);
  const organization = new Organization({
    email,
    password: passwordCrypted,
    name,
  });

  await organization.save();
  ctx.response.status = CREATED;
  ctx.body = organization;
};

const login = async ({ ctx }) => {
  const {
    state: { requestedOrganization },
    models: { Session },
  } = ctx;
  requestedOrganization.lastConnectionAt = Date.now();
  await requestedOrganization.save();

  const session = new Session({
    organizationId: requestedOrganization._id,
  });
  await session.save();

  ctx.body = { ...requestedOrganization.toObject(), token: session._id };
};

const logout = async ({ ctx }) => {
  const {
    state: { token },
    models: { Session },
  } = ctx;
  await Session.deleteOne({ _id: token });
  ctx.response.status = NO_CONTENT;
};

const fetchMe = async ({ ctx }) => {
  ctx.body = ctx.state.organization;
};

exports.controller = {
  create,
  login,
  logout,
  fetchMe,
};
