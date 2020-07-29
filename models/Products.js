const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: {
    type: String,
    // required: true,
  },
  productPrice: {
    type: Number,
    // required: true,
  },
  productDescription: {
    type: String,
    // required: true,
  },
  storeId: {
    type: Number,
    // required: true,
  },
  productQuantity: {
    type: String,
    // required: true,
  },
});

module.exports = Products = mongoose.model("products", ProductSchema);
