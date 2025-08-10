const express = require('express')
const {registercontroller } = require('../controllers/auth.controller')

const router = express.Router()

router.get('/register',registercontroller)



module.exports = router