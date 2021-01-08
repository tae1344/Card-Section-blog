// 인증 시 이용가능
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json({ auth: false, message: 'Please check authentication' });
}
// 비인증도 이용가능
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(200).json({ auth: true, message: 'Success authentication' });
  }
  next();
}

module.exports = { checkAuthenticated, checkNotAuthenticated }