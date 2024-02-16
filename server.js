import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { nanoid } from "nanoid";

const app = express();
dotenv.config();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

let products = [
  { id: nanoid(), title: "avant-garde lamp", company: "Modenza" },
  { id: nanoid(), title: "coffee table", company: "Modenza" },
];

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/", (req, res) => {
  console.log(req);

  res.json({ message: "Data received", data: req.body });
});

app.get("/api/v1/products", (req, res) => {
  res.status(200).json({ products });
});

app.get("/api/v1/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((item) => item.id === id);
  res.status(200).json({ product });
});

app.post("/api/v1/products", (req, res) => {
  const { title, company } = req.body;
  if (!title || !company) {
    res.status(400).json({ msg: "Please provide title or company" });
    return;
  }
  const product = { id: nanoid(), title, company };
  products.push(product);
  res.status(201).json({ product });
});

app.patch("/api/v1/products/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ msg: "Id not match" });
    return;
  }

  const product = products.find((item) => item.id === id);
  if (!product) {
    res.status(404).json({ msg: "Product not found" });
    return;
  }
  const { title, company } = req.body;
  product.company = company;
  product.title = title;
  res.status(200).json({ product });
});

app.delete("/api/v1/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((item) => item.id === id);
  if (!product) {
    return res.status(404).json({ msg: `no product with id ${id}` });
  }
  const newProducts = products.filter((product) => product.id !== id);
  products = newProducts;

  res.status(200).json({ msg: "job deleted" });
});

const port = process.env.PORT || 5200;
try {
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
}
