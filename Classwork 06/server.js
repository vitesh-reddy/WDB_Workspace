import express from "express";

const app = new express();

app.use(express.json())  

app.get("/api/hi", (req, res) => {
  res.send("Hii");
})

app.get("/api/data", (_, res) => {
  res.sendFile("data.json", { root: "./Classwork 06" });
})

app.patch("/api/user", (req, res) => {
  const { id, newName } = req.body;
  res.send(`User with id: ${id} has been updated with name: ${newName}`);
});

app.listen(3000, () => console.log("Server listening at 3000"));