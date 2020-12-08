const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const { User } = require('./models/Users');

module.exports = () => {
  //세션 관리
  passport.serializeUser(function (user, done) { // Strategy 성공 시 호출됨
    done(null, user.id); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser(function (id, done) { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    User.findById(id, function (err, user) { // 여기의 user가 req.user가 됨
      done(err, user);
    });
  });

  //LocalStrategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
    function (username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: '존재하지 않는 유저입니다.' });
        }

        return user.comparePassword(password, (err, isMatch) => {
          if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
          return done(null, user);
        });
      });
    }
  ));
}