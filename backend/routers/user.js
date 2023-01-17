const express = require('express')
const controller = require('../controllers/userCont')

const router = express.Router()

//logged in using credentials
router.post('/login', controller.post_login)
//signing up using credentials
router.post('/signup',controller.post_signup)
//Logging out
router.get('/logout', controller.logout)

module.exports = router