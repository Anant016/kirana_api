const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 1. Save Product
router.post("/save", (req, res) => {
  const newProduct = new Product({
    storeId: req.body.storeId,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productDescription: req.body.productPrice,
    productQuantity: req.body.productQuantity,
  });
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
});

// 2. Get All Product of one store
router.post("/get-all", (req, res) => {
  Product.find({ storeId: req.body.storeId })
    .then((product) => res.send(product))
    .catch((err) =>
      res.status(404).json({ noProductFound: "No Product found" })
    );
});

// 3. Get Product By Id
router.get("/get/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ noProductFound: "No Product found with that ID" })
    );
});

// 5. Edit Product
router.post("/edit/:id", (req, res) => {
  var newData = {
    storeId: req.body.storeId,
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productDescription: req.body.productPrice,
    productQuantity: req.body.productQuantity,
  };
  Product.findOneAndUpdate(
    { _id: req.params.id },
    { $set: newData },
    { new: true }
  )
    .then((product) => res.json(product))
    .catch((err) => console.log(err));
});

// 6. Delete Product by id
router.delete("/delete/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.remove().then(() => res.json({ success: true }));
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// 7. Delete All Products
router.delete("/delete-all", (req, res) => {
  Product.deleteMany()
    .then((data) => res.send({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
