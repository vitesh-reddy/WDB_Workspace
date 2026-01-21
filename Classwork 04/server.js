import express from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import multer from 'multer';

const app = express();
const PORT = 3000;
const _filename_ = fileURLToPath(import.meta.url);
const _dirname_ = path.dirname(_filename_);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const accessLogStream = createStream('access.log', {
  interval: '1d',
  path: _dirname_,
});
const logger = (req, res, next) => {
    const age=req.query.age;
    if(!age){
        res.send("Please provide your age");
        return;
    }
    if(age<18){
        res.send("You are not allowed to access this page");
        return;
    }
  console.log("Logged in Successfully");
  next();
}
app.use(morgan('combined', { stream: accessLogStream, skip: req => req.path === '/favicon.ico' }));
app.use(morgan('tiny', { skip: req => req.path === '/favicon.ico' }));
app.use(morgan(':method :url :status'));
morgan.token("abcd","A new :method request for :url was resolved. "+"It took :total-time[2] milliseconds to be resolved");
app.use(morgan("abcd"));
app.use(express.static('.'));

app.get('/', (req, res) => {
  res.redirect('/a.html');
});
const rerr=function (err,req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
}
app.get('/ffsd-1', (req, res, next) => {
  fsPromises.readFile('server.js')
    .then(data => res.send(data))
    .catch(err => next(err));
});
app.get('/ffsd-2', (req, res) => {
  res.redirect('a.html');
  res.send('Hello, FFSD2!');
});
app.get('/ffsd-3', (req, res) => {
  res.send('Hello, FFSD3!');
});

// File upload route
app.post('/upload', upload.single('fileUpload'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send(`File uploaded successfully: ${req.file.filename}`);
});

app.use(rerr);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});