const express = require('express');
const { registerView, loginView, homeView, userRegister, userLogin, userLogout } = require('../controllers/user.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');
const router = express.Router();

router.get('/register', registerView);
router.get('/login', loginView);
router.get('/home', isAuthenticated, homeView);

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/logout', userLogout);

module.exports = router;