import express from "express";
import myLogger from "./middlewares/logger.middleware.js";

const app = express();
app.use(express.json());

app.use(myLogger);

app.get("/fsd-1", (req, res) => {
  res.json({message: "In the FSD-1 Route"});
})

app.get("/fsd-2", (req, res) => {
  res.json({message: "In the FSD-2 Route"});
})
app.get("/fsd-3", (req, res) => {
  res.json({message: "In the FSD-3 Route"});
})

app.listen(3000, () => console.log("Server started Listening at port 3000"));