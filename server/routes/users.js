const express = require('express');
const { checkAuthenticated, checkNotAuthenticated } = require('../controllers/auth');
const { register, logout, login } = require('../controllers/users');

const router = express.Router();


/*===================
        User API 
 =================== */

router.get('/', checkAuthenticated, (req, res) => res.json({ auth: true }));

router.get('/register', checkNotAuthenticated, (req, res) => res.redirect(`${url}/welcome`));
router.post('/register', checkNotAuthenticated, register);


router.get('/login', checkNotAuthenticated, (req, res) => res.json({ isLogin: true }));
router.post('/login', checkNotAuthenticated, login);

router.get('/logout', logout);
router.get('/user', (req, res) => res.send(req.user));


module.exports = router;