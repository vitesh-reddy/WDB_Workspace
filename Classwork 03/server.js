import express from "express";
import fs from 'fs';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import path from 'path';

const app = express();
app.use(express.json());

const accessLogStream = createStream('access.log', {
  interval: '1d', 
  size: '10M', 
  path: path.join(process.cwd(), 'logs'),
  compress: 'gzip' 
});

morgan.token('custom-date', () => {
  return new Date().toISOString();
});

morgan.token('response-time-ms', (req, res) => {
  if (!req._startAt || !res._startAt) {
    return '0ms';
  }
  const ms = (res._startAt[0] - req._startAt[0]) * 1000 + 
             (res._startAt[1] - req._startAt[1]) / 1000000;
  return ms.toFixed(3) + 'ms';
});


const abcd = ':custom-date :method :url :status :response-time-ms';


app.use(morgan(abcd, { stream: accessLogStream })); 
app.use(morgan(abcd)); 

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