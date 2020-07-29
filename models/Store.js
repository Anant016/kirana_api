const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  storeName: {
    type: String,
    // required: true,
  },
  storeAddress: {
    type: String,
    // required: true,
  },
  storeLandmark: {
    type: String,
    // required: true,
  },
  storePincode: {
    type: Number,
    // required: true,
  },
  storeCity: {
    type: Number,
    // required: true,
  },
  // unique
  storeNumber: {
    type: String,
    // required: true,
  },
});

module.exports = Store = mongoose.model("stores", StoreSchema);
