import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/", (req, res) => {
  console.log(req);

  res.json({ message: "Data received", data: req.body });
});

const port = process.env.PORT || 5200;
try {
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
}
