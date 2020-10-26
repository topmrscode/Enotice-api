const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const transformOrganization = (_doc, ret) => {
  delete ret.password;
  delete ret.__v;
};

const organizationSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    lastConnectionAt: { type: Date },
  },
  {
    toObject: {
      transform: transformOrganization,
    },
    toJSON: {
      transform: transformOrganization,
    },
    timestamps: true,
  }
);

exports.Organization = mongoose.model("Organization", organizationSchema);
