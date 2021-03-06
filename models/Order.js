const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  items: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  orderType: {
    type: Number,
  },
  storeId: {
    type: String,
  },
  isMasterStore: {
    type: Boolean,
  },
});

module.exports = Order = mongoose.model("orders", OrderSchema);
