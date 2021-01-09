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
    res.json({ register: false, message: "Register failed" });
  }
}

const login = passport.authenticate('local', {
  successRedirect: 'loginSuccess',
  failureRedirect: 'loginFail',
  failureFlash: true
});

// 로그인
// const login = (req, res, next) => {

//   passport.authenticate("local", (err, user, info) => {
//     if (err) throw err;
//     if (!user) res.send({
//       message: "No User Exists",
//       isLogin: false
//     });
//     else {
//       req.logIn(user, (err) => {
//         if (err) throw err;
//         res.send({
//           message: "Successfully Authenticated",
//           user: req.user,
//           isLogin: true
//         });
//       });
//     }
//   })(req, res, next);
// }



// 로그아웃
const logout = (req, res) => {
  req.logout();
  req.session.save((err) => {
    if (err) throw res.send(err);
  });
  res.status(200).json({ message: 'Log out successed', user: null });
}





module.exports = { register, login, logout };