const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const config = require('./config/key');
const session = require('express-session');
const cors = require('cors');
const flash = require('connect-flash');
const cookieSession = require('cookie-session');
const helmet = require("helmet");
const favicon = require('serve-favicon')
const path = require('path')

const passport = require('passport');
const initializePassport = require('./config/passport-config');

const CLIENT = 'https://cardgram.netlify.app';
const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives()
  }
}));

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(cookieParser('zxcasdqwe!@#$'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: `${CLIENT}`, //연결 할 client 주소
  credentials: true,
  method: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));
// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'key2']
// }));
app.use(session({
  name: 'sessionID',
  keys: ['key1', 'key2'],
  secret: 'zxcasdqwe!@#$',
  resave: false,
  saveUninitialized: false,
})); // 세션 활성화

app.use(flash());
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결

app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

// passport 설정
initializePassport(passport);


// DB 연결
const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => { console.log('MongoDB Connected...') })
  .catch(err => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server started on PORT ${PORT}`) });