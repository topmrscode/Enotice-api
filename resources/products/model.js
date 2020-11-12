const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const transformProduct = (_doc, ret) => {
  delete ret.__v;
};

const productSchema = new Schema(
  {
    reference: { type: String },
    videoId: { type: String },
    file: { type: String },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  {
    toObject: {
      transform: transformProduct,
    },
    toJSON: {
      transform: transformProduct,
    },
    timestamps: true,
  }
);

exports.Product = mongoose.model("Product", productSchema);
