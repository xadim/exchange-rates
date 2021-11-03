const mongoose = require("mongoose");

const Rateschema = new mongoose.Schema(
  {
    currencyCode: {
      type: String,
      required: true,
      maxLength: 30,
    },
    exchangeRate: {
      type: Number,
      required: true,
      maxLength: 12,
    },
    createdDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    deletedDate: {
      type: Date,
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);
const Rate = mongoose.model("Rate", Rateschema);
Rate.createIndexes();

module.exports = Rate;
