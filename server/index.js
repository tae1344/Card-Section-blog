const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models/Users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB 연결
const mongoURI = 'mongodb+srv://taeyeon:aksemr123@boilerplate.o8zxo.mongodb.net/BoilerPlate?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => { console.log('MongoDB Connected...') })
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 가입
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ succesee: false, err });
    return res.status(200).json({
      succesee: true
    });
  });
})

const PORT = 5000;
app.listen(PORT, () => { console.log(`Server started on PORT ${PORT}`) });