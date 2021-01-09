const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models/Users');

function initialize(passport) {
  //세션 관리
  passport.serializeUser(function (user, done) { // Strategy 성공 시 딱 한번 호출됨
    console.log('serializeUser', user);
    done(null, user.id); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser(function (id, done) { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    console.log('deserializeUser', id);
    User.findById(id, function (err, user) { // 여기의 user가 req.user가 됨
      return done(err, user);
    });
  });

  //LocalStrategy
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
    async (email, password, done) => {

      User.findOne({ email: email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        try {
          user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
              return done(null, false, { message: 'Password incorrect' });
            } else {
              return done(null, user); //serializeUser 첫 번째 인자로 넘어감
            }
          });
        } catch (err) {
          return done(err);
        }
      });
    }
  ));
}

module.exports = initialize