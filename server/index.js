const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/key');
const session = require('express-session');
const { User } = require('./models/Users');
const passport = require('passport');
const passportConfig = require('./passport');

const app = express();

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false })); // 세션 활성화
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

passportConfig(passport);

// DB 연결
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => { console.log('MongoDB Connected...') })
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.status(200).json({ message: "success!!!" });
})

// 가입
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ succesee: false, err });
    return res.status(200).json({
      succesee: true
    });
  });
});

// 로그인
app.post('/api/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/api/users/login',
  failureFlash: true
})

);

const PORT = 3000;
app.listen(PORT, () => { console.log(`Server started on PORT ${PORT}`) });