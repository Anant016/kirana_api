// Operations to do on Orders
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Address = require("../models/Address");

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

// @POST - Place Order
router.post("/addToOrder", (req, res) => {
  // 1. Cart to Order
  Cart.find({ number: req.body.number }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      let current_datetime = new Date();
      let time_now =
        current_datetime.getHours() + ":" + current_datetime.getMinutes();
      let date_now =
        current_datetime.getDate() +
        "-" +
        months[current_datetime.getMonth()] +
        "-" +
        current_datetime.getFullYear();
      var totalPrice = 0;
      var OrderArray = [];
      data.map((item) => {
        let OrderItem = {
          name: item.name,
          price: item.price,
          desc: item.desc,
          qty: item.qty,
          //number: item.number,
          image: item.image,
        };
        totalPrice = totalPrice + parseFloat(item.price) * parseInt(item.qty);
        OrderArray.push(OrderItem);
      });
      Address.findOne({ _id: req.body._id }, (err, data) => {
        // console.log("Address:" + data);
        let wholeOrder = new Order({
          items: OrderArray,
          name: data.name,
          address: data.address,
          landmark: data.landmark,
          pincode: data.pincode,
          number: data.number,
          totalPrice: totalPrice,
          date: date_now,
          time: time_now,
        });
        wholeOrder.save((err) => {
          if (err) {
            console.log(err);
            //  res.send(err);
          } else {
            console.log("order added");
          }
        });
      });
    }
  });
  // 2. Remove from cart
  Cart.remove({ number: req.body.number }, (err, data) => {
    if (err) {
      req.send(err);
    } else {
      res.send({ success: true });
    }
  });
});

// @POST - Get all orders of a particular user
router.post("/orders", (req, res) => {
  Order.find({ number: req.body.number }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
