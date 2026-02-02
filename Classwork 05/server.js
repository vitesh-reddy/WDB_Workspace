import express from "express";

const app = express();
app.use(express.json());

let items = [];
let id = 1;

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const item = { id: id++, name: req.body.name };
  items.push(item);
  res.json(item);
});

app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id == req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  item.name = req.body.name;
  res.json(item);
});

app.delete("/items/:id", (req, res) => {
  items = items.filter((i) => i.id != req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => console.log("Server started Listening at port 3000"));
