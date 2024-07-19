require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth-route");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const app = express();
const cors = require("cors");
const productRouter = require("./routes/product-route");
const authenticate = require("./middlewares/authenticate");
const morgan = require("morgan");
const cartRouter = require("./routes/cart-route");
const orderRouter = require("./routes/order-route");

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("OK!!!!");
});

app.use("/auth", authRouter);
app.use("/products", authenticate, productRouter);
app.use("/cart", authenticate, cartRouter);
app.use("/orders", authenticate, orderRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("server is running on ", PORT));
