import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

const app = express();
const PORT = 3000;

const registrations = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });


app.set('view engine', 'ejs');
app.set('views', './Fraud Proof SDC');

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', csrfProtection, (req, res) => {
  res.render('home', { csrfToken: req.csrfToken() });
});

app.post('/submit', csrfProtection, (req, res) => {
  const { name, clubname, membertype, rollno, clubstrength } = req.body;
  registrations.push({ name, clubname, membertype, rollno, clubstrength });
  res.redirect('/club');
});

app.get('/club', (req, res) => {
  res.render('club');
});

app.get('/registrations', (req, res) => {
  res.json(registrations);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});