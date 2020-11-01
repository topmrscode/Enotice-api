const { CREATED, NO_CONTENT } = require("http-status-codes");
const { qsDecoder } = require("../../helpers/qsDecoder");

const create = async ({ ctx }) => {
  const {
    request: {
      body: { reference, videoId, fileUrl },
    },
    state: { organization },
    models: { Product },
  } = ctx;

  const product = new Product({
    reference,
    videoId,
    fileUrl,
    organizationId: organization._id,
  });

  await product.save();
  ctx.response.status = CREATED;
  ctx.body = { data: product, error: null };
};

const update = async ({ ctx }) => {
  const {
    request: { body },
    state: { requestedProduct },
  } = ctx;

  requestedProduct.set({
    ...requestedProduct,
    ...body,
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
  ctx.body = ctx.state.requestedProduct;
};

exports.controller = {
  create,
  update,
  remove,
  findOne,
  list,
  findOnePublic,
};
