import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(5200, () => {
  console.log("Server is listening on port: 5200");
});
