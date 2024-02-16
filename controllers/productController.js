import { nanoid } from "nanoid";

let products = [
  { id: nanoid(), title: "avant-garde lamp", company: "Modenza" },
  { id: nanoid(), title: "coffee table", company: "Modenza" },
];

export const getAllProducts = (req, res) => {
  res.status(200).json({ products });
};

export const getSingleProduct = (req, res) => {
  const { id } = req.params;
  const product = products.find((item) => item.id === id);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  res.status(200).json({ product });
};

export const createProduct = (req, res) => {
  const { title, company } = req.body;
  if (!title || !company) {
    res.status(400).json({ msg: "Please provide title or company" });
    return;
  }
  const product = { id: nanoid(), title, company };
  products.push(product);
  res.status(201).json({ product });
};

export const updateProduct = (req, res) => {
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
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const product = products.find((item) => item.id === id);
  if (!product) {
    return res.status(404).json({ msg: `no product with id ${id}` });
  }
  const newProducts = products.filter((product) => product.id !== id);
  products = newProducts;

  res.status(200).json({ msg: "job deleted" });
};
