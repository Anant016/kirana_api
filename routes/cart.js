// Operations to do on Cart
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// @POST - Add
router.post("/add", (req, res) => {
  let NewProduct = new Cart({
    name: req.body.name,
    price: req.body.price,
    qty: req.body.qty,
    image: req.body.image,
    desc: req.body.desc,
    number: req.body.number,
  });

  Cart.findOne({
    name: req.body.name,
    price: req.body.price,
    desc: req.body.desc,
    number: req.body.number,
  }).then((product) => {
    if (product) {
      Cart.findOneAndUpdate(
        {
          name: req.body.name,
          price: req.body.price,
          desc: req.body.desc,
          number: req.body.number,
        },
        { $set: { qty: String(Number(product.qty) + Number(req.body.qty)) } },
        { new: true }
      )
        .then((product) => res.json(product))
        .catch((err) => res.send(err));
    } else {
      NewProduct.save((err) => {
        if (err) {
          res.send(err, 422);
        } else {
          res.send(NewProduct, 201);
        }
      });
    }
  });
});

// @POST - Get Items in cart for a single user
router.post("/get", (req, res) => {
  Cart.find({ number: req.body.number }, (err, data) => {
    if (err) {
      res.send(err, 422);
    } else {
      res.send(data, 200);
    }
  });
});

// @POST - Remove items from cart
router.post("/removeitem", (req, res) => {
  Cart.findOneAndRemove(
    {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      image: req.body.image,
      number: req.body.number,
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

// @POST - Update qty in cart
router.post("/update", (req, res) => {
  Cart.findOneAndUpdate(
    {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      image: req.body.image,
      number: req.body.number,
    },
    { $set: { qty: req.body.qty } },
    { new: true }
  )
    .then((product) => res.json(product))
    .catch((err) => res.send(err));
});

module.exports = router;
