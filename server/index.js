const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const config = require('./config/key');
const session = require('express-session');
const cors = require('cors');
const flash = require('connect-flash');

const passport = require('passport');
const initializePassport = require('./config/passport-config');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000", //연결 할 client 주소
  credentials: true
}));
app.use(session({ secret: 'asadlfkjg', resave: false, saveUninitialized: false })); // 세션 활성화

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