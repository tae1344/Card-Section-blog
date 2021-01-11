const express = require('express');
const { checkAuthenticated, checkNotAuthenticated } = require('../controllers/auth');
const { register, logout, login } = require('../controllers/users');

const router = express.Router();


/*===================
        User API 
 =================== */

router.get('/', checkAuthenticated, (req, res) => res.send({ auth: true, message: 'Authenticated User' })); // Client에 인증여부 전달해주는 라우터

router.get('/register', checkNotAuthenticated);
router.post('/register', checkNotAuthenticated, register);

router.post('/login', login);

router.get('/logout', logout);



module.exports = router;