const express = require("express");
const router = express.Router();
const Store = require("../models/Store");

// 1. Save Store
router.post("/save", (req, res) => {
  const newStore = new Store({
    storeName: req.body.storeName,
    storeAddress: req.body.storeAddress,
    storeLandmark: req.body.storeLandmark,
    storeCity: req.body.storeCity,
    storePincode: req.body.storePincode,
    storeNumber: req.body.storeNumber,
  });
  newStore
    .save()
    .then((store) => res.json(store))
    .catch((err) => res.json(err));
});

// 2. Get All Stores
router.get("/get-all", (req, res) => {
  Store.find()
    .then((store) => res.send(store))
    .catch((err) => res.status(404).json({ noStoreFound: "No Store found" }));
});

// 3. Get Stores By Id
router.get("/get/:id", (req, res) => {
  Store.findById(req.params.id)
    .then((store) => res.json(store))
    .catch((err) =>
      res.status(404).json({ noStoreFound: "No Store found with that ID" })
    );
});

// 5. Edit Store
router.post("/edit/:id", (req, res) => {
  var newData = {
    storeName: req.body.storeName,
    storeAddress: req.body.storeAddress,
    storeLandmark: req.body.storeLandmark,
    storeCity: req.body.storeCity,
    storePincode: req.body.storePincode,
    storeNumber: req.body.storeNumber,
  };
  Store.findOneAndUpdate(
    { _id: req.params.id },
    { $set: newData },
    { new: true }
  )
    .then((store) => res.json(store))
    .catch((err) => console.log(err));
});

// 6. Delete Store by id
router.delete("/delete/:id", (req, res) => {
  Store.findById(req.params.id)
    .then((store) => {
      store.remove().then(() => res.json({ success: true }));
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// 7. Delete All Stores
router.delete("/delete-all", (req, res) => {
  Store.deleteMany()
    .then((data) => res.send({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
