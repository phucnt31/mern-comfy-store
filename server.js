import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import "express-async-errors";

// routes
import productRoute from "./routes/productRouter.js";
import authRoute from "./routes/authRouter.js";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

const app = express();
dotenv.config();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1/products", productRoute);
app.use("/api/v1/auth", authRoute);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5200;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
