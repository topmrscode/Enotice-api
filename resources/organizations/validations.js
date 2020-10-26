const yup = require("yup");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { BAD_REQUEST } = require("http-status-codes");
const {
  ERROR_EMAIL_IS_REQUIRED,
  ERROR_EMAIL_VALIDATION,
  ERROR_PASSWORD_IS_REQUIRED,
  ERROR_PASSWORD_NOT_MATCH,
  ERROR_BAD_PASSWORD,
  ERROR_NAME_IS_REQUIRED,
  ERROR_BAD_CREDENTIALS,
} = require("./helpers");
const { REGEX_PASSWORD } = require("../../helpers/validation");

const create = async ({ ctx }) => {
  const {
    request: { body: values },
  } = ctx;

  await yup
    .object({
      email: yup
        .string()
        .required(ERROR_EMAIL_IS_REQUIRED)
        .email(ERROR_EMAIL_VALIDATION),
      password: yup
        .string()
        .required(ERROR_PASSWORD_IS_REQUIRED)
        .matches(REGEX_PASSWORD, ERROR_PASSWORD_NOT_MATCH),
      name: yup.string().required(ERROR_NAME_IS_REQUIRED),
    })
    .validate(values, { abortEarly: false })
    .catch((err) => {
      ctx.throw(BAD_REQUEST, err.message);
    });
};

const login = async ({ ctx }) => {
  const {
    request: {
      body: values,
      body: { email, password },
    },
    models: { Organization },
  } = ctx;

  await yup
    .object({
      email: yup
        .string()
        .required(ERROR_EMAIL_IS_REQUIRED)
        .typeError(ERROR_EMAIL_VALIDATION),
      password: yup
        .string()
        .required(ERROR_PASSWORD_IS_REQUIRED)
        .typeError(ERROR_BAD_PASSWORD),
    })
    .validate(values, { abortEarly: false })
    .catch((err) => {
      ctx.throw(BAD_REQUEST, err.message);
    });

  const organization = await Organization.findOne({ email });
  if (!organization) {
    return ctx.throw(BAD_REQUEST, ERROR_BAD_CREDENTIALS);
  }
  const isGoodPassword = bcrypt.compareSync(password, organization.password);
  if (!isGoodPassword) {
    return ctx.throw(BAD_REQUEST, ERROR_BAD_CREDENTIALS);
  }
  ctx.state.requestedOrganization = organization;
};

exports.validations = {
  create,
  login,
};
