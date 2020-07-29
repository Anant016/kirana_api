const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Mongoose Connect
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://anucool:anucool123@ds231956.mlab.com:31956/kirana", {
    useNewUrlParser: true,
  })
  .then(console.log("MongoDbConnected"))
  .catch((err) => console.log(err));

//Creating app using express
const app = express();

//bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors middleware
app.use(cors());

// USERS
const users = require("./routes/users");
app.use("/users", users);

// STORES
const store = require("./routes/store");
app.use("/store", store);

// ADDRESSES
const address = require("./routes/address");
app.use("/address", address);

// PRODUCTS
const products = require("./routes/products");
app.use("/products", products);

// CART
const cart = require("./routes/cart");
app.use("/cart", cart);

// ORDERS
const orders = require("./routes/orders");
app.use("/orders", orders);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running at port: ${port}`));
