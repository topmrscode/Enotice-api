const { CREATED, NO_CONTENT } = require("http-status-codes");
const { qsDecoder } = require("../../helpers/qsDecoder");
const { splitFile, splitVideoId } = require("./helpers");

const create = async ({ ctx }) => {
  const {
    request: {
      body: { reference, videoId },
      files,
    },
    state: { organization },
    models: { Product },
  } = ctx;
  const newVideoId = splitVideoId(videoId);
  const host = ctx.request.headers.host;
  const file = splitFile({ host, files });

  const product = new Product({
    reference,
    videoId: newVideoId,
    file: file,
    organizationId: organization._id,
  });

  await product.save();
  ctx.response.status = CREATED;
  ctx.body = { data: product, error: null };
};

const update = async ({ ctx }) => {
  const {
    request: { body, files },
    state: { requestedProduct },
  } = ctx;

  const newVideoId = splitVideoId(body.videoId);
  const host = ctx.request.headers.host;
  const file =
    body.file == "null" ? requestedProduct.file : splitFile({ host, files });

  requestedProduct.set({
    ...requestedProduct,
    ...body,
    videoId: newVideoId,
    file,
  });

  const updatedProduct = await requestedProduct.save();
  ctx.body = { data: updatedProduct, error: null };
};

const remove = async ({ ctx }) => {
  const {
    params: { id: _id },
    models: { Product },
  } = ctx;

  await Product.deleteOne({ _id });
  ctx.response.status = NO_CONTENT;
};

const findOne = async ({ ctx }) => {
  const {
    state: { requestedProduct },
  } = ctx;

  let product = requestedProduct;
  product = await product.populate({ path: "organizationId" }).execPopulate();

  ctx.body = { data: product, error: null };
};

const list = async ({ ctx }) => {
  const {
    request: { query },
    state: { organization },
    models: { Product },
  } = ctx;

  const { offset = 0, limit = 0 } = qsDecoder(query, {
    offset: Number,
    limit: Number,
  });

  const sort = { createdAt: -1 };
  const products = await Product.find({ organizationId: organization._id })
    .sort(sort)
    .skip(offset)
    .limit(limit);

  const total = await Product.countDocuments({
    organizationId: organization._id,
  });
  ctx.body = { data: { products, limit, offset, total }, error: null };
};

const findOnePublic = async ({ ctx }) => {
  ctx.body = { data: ctx.state.requestedProduct, error: null };
};

exports.controller = {
  create,
  update,
  remove,
  findOne,
  list,
  findOnePublic,
};
