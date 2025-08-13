const express = require('express')
const {registercontroller , postregistercontroller, logincontroller, postlogincontroller, userlogout } = require('../controllers/auth.controller')

const router = express.Router()

// router.get('/register',registercontroller)
// router.get('/register',postregistercontroller)  //normal way to write 

router.route('/register')    // flex karne keliya 
    .get(registercontroller)
    .post(postregistercontroller);

router.route('/login')
    .get(logincontroller)
    .post(postlogincontroller);

router.route('/logout')
    .get(userlogout)

module.exports = router