const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth.controller');


router.post('/signup', authCtrl.signUp);
router.post('/signin', authCtrl.signIn);
router.post('/check', authCtrl.check);
router.post('/findUser', authCtrl.findUser);

module.exports = router;