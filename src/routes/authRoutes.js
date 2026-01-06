const express = require('express')
const authController = require('../controllers/authController')
const {rateLimiter} = require("../utils/rateLimiter")
const router = express.Router()

router.post('/login', rateLimiter, authController.login) //testado
router.patch('/refresh', authController.refresh) //testado
router.post('/logout', authController.logout) //testado


module.exports=router