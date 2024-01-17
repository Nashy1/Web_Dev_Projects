const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cartsRoute = require("./routes/cart");
const subscriberRoute = require("./routes/subscriber");
const cors = require("cors");


dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DBConnection Successful!"))
.catch((error) => {
    console.log(error);
});

app.use(cors());
app.use(express.json())

app.use("*", (req, res, next) => {
    console.log("Requested URL:", req.url);
    next();
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartsRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/subscribers", subscriberRoute)

app.listen(process.env.PORT || 5000, ()=> {
    console.log("Backend server is running!");
});