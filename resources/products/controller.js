const { CREATED, NO_CONTENT } = require("http-status-codes");
const mongoose = require("mongoose");

const create = async ({ ctx }) => {
  const {
    request: {
      body: { title, videoId, fileUrl },
    },
    state: { organization },
    models: { Product },
  } = ctx;

  const product = new Product({
    title,
    videoId,
    fileUrl,
    organizationId: organization._id,
  });

  await product.save();
  ctx.response.status = CREATED;
  ctx.body = product;
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

  ctx.body = await requestedProduct.save();
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

  ctx.body = product;
};

const list = async ({ ctx }) => {
  const {
    state: { organization },
    models: { Product },
  } = ctx;

  const products = await Product.find({ organizationId: organization._id });
  ctx.body = products;
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
