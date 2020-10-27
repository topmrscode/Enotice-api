const yup = require("yup");

const { BAD_REQUEST, NOT_FOUND, getStatusText } = require("http-status-codes");
const {
  ERROR_FILE_URL_IS_REQUIRED,
  ERROR_TITLE_IS_REQUIRED,
  ERROR_VIDEO_ID_IS_REQUIRED,
} = require("./helpers");

const create = async ({ ctx }) => {
  const {
    request: { body: values },
  } = ctx;

  await yup
    .object({
      title: yup.string().required(ERROR_TITLE_IS_REQUIRED),
      videoId: yup.string().required(ERROR_VIDEO_ID_IS_REQUIRED),
      fileUrl: yup.string().required(ERROR_FILE_URL_IS_REQUIRED),
    })
    .validate(values, { abortEarly: false })
    .catch((err) => {
      ctx.throw(BAD_REQUEST, err.message);
    });
};

const update = async ({ ctx }) => {
  const {
    request: { body: values },
    params: { id },
    models: { Product },
  } = ctx;

  await yup
    .object({
      title: yup.string().required(ERROR_TITLE_IS_REQUIRED),
      video: yup.string().required(ERROR_VIDEO_IS_REQUIRED),
      file: yup.string().required(ERROR_FILE_IS_REQUIRED),
    })
    .validate(values, { abortEarly: false })
    .catch((err) => {
      ctx.throw(BAD_REQUEST, err.message);
    });

  const product = await Product.findById(id);
  if (!product) {
    return ctx.throw(NOT_FOUND, getStatusText(NOT_FOUND));
  }
  ctx.state.requestedProduct = product;
};

const remove = async ({ ctx }) => {
  const {
    params: { id },
    models: { Product },
  } = ctx;

  const product = await Product.findById(id);
  if (!product) {
    return ctx.throw(NOT_FOUND, getStatusText(NOT_FOUND));
  }
};

const findOne = async ({ ctx }) => {
  const {
    params: { id },
    models: { Product },
  } = ctx;

  const product = await Product.findById(id);
  if (!product) {
    return ctx.throw(NOT_FOUND, getStatusText(NOT_FOUND));
  }
  ctx.state.requestedProduct = product;
};

const findOnePublic = async ({ ctx }) => {
  const {
    params: { id },
    models: { Product },
  } = ctx;

  const product = await Product.findById(id);
  if (!product) {
    return ctx.throw(NOT_FOUND, getStatusText(NOT_FOUND));
  }
  ctx.state.requestedProduct = product;
};

exports.validations = {
  create,
  update,
  remove,
  findOne,
  findOnePublic,
};
