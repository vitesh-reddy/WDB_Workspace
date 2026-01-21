import express from "express";
import fs from 'fs';

const app = express();
app.use(express.json());

const fsPromises = fs.promises;

app.get("/fsd-1", async (req, res) => {
  try {
    const data = await fsPromises.readFile('./Classwork 02/index.html');
    res.send(data);  
  } catch (err) {
    res.json({message: err.message});
  }
})

app.get("/fsd-2", (req, res) => {
  res.json({message: "In the FSD-2 Route"});
})
app.get("/fsd-3", (req, res) => {
  res.json({message: "In the FSD-3 Route"});
})

app.listen(3000, () => console.log("Server started Listening at port 3000"));