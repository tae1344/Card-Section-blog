const passport = require('passport');
const { User } = require('../models/Users');

// 가입
const register = async (req, res) => {
  try {
    const user = new User(req.body);

    user.save((err, userInfo) => {
      if (err) throw err;
      return res.status(200).json({
        succesee: true,
        message: "Register Successed"
      });
    });
  } catch {
    res.json({ succesee: false, message: "Register failed" });
  }
}

// const login = passport.authenticate('local', {
//   successRedirect: 'loginSuccess',
//   failureRedirect: 'loginFail',
//   failureFlash: true
// });

// 로그인
const login = (req, res, next) => {
  // Custom Passport Callback으로 작성 --> 리액트에서 호환시키기 위함
  passport.authenticate("local-login", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      return res.send({
        message: "No User Exists",
        isAuthenticated: false
      });
    }

    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ message: err });
      }
      // 로그인이 성공적이기 때문에, isAuthenticated: true 해줘 인증 여부 체크하도록 Client에 넘겨줌!!
      return res.json({ id: user.id, name: user.name, email: user.email, isAuthenticated: true });
    });

  })(req, res, next);
}



// 로그아웃
const logout = (req, res) => {
  req.logout();
  req.session.save((err) => {
    if (err) throw res.send(err);
  });
  res.status(200).json({ message: 'Log out successed', user: null });
}





module.exports = { register, login, logout };