// Address for Users and Stores
const express = require("express");
const router = express.Router();
const Address = require("../models/Address");

// @POST - Add Address
router.post("/add", (req, res) => {
  let NewAddress = new Address({
    name: req.body.name,
    landmark: req.body.landmark,
    address: req.body.address,
    pincode: req.body.pincode,
    number: req.body.number,
  });
  NewAddress.save((err) => {
    if (err) {
      res.send(err, 422);
    } else {
      res.send(NewAddress, 201);
    }
  });
});

// @POST - Delete Address
router.post("/delete", (req, res) => {
  Address.findOneAndRemove(
    {
      _id: req.body._id,
    },
    (err) => {
      if (err) {
        res.send(err, 422);
      } else {
        res.send({ success: true }, 200);
      }
    }
  );
});

// @POST - Get Addresses of a particular user/store
router.post("/get", (req, res) => {
  Address.find({ number: req.body.number }, (err, data) => {
    if (err) {
      res.send(err, 422);
    } else {
      res.send(data, 200);
    }
  });
});

module.exports = router;
