import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

const registrations = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./SDC'));
// app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/home.html');
});

 app.post('/submit', (req, res) => {
  const { name, clubname, membertype, rollno, clubstrength } = req.body;
  registrations.push({ name, clubname, membertype, rollno, clubstrength });
  res.redirect('/club.html');
});

app.get('/registrations', (req, res) => {
  res.json(registrations);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});