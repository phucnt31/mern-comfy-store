import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/", (req, res) => {
  console.log(req);

  res.json({ message: "Data received", data: req.body });
});

app.listen(5200, () => {
  console.log("Server is listening on port: 5200");
});
