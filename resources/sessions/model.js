const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const transformSession = (_doc, ret) => {
  delete ret.__v;
};

const sessionSchema = new Schema(
  {
    organizationId: { type: String },
  },
  {
    toObject: {
      transform: transformSession,
    },
    toJSON: {
      transform: transformSession,
    },
  }
);

exports.Session = mongoose.model("Session", sessionSchema);
