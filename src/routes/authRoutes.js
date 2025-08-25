const express = require('express')
const authController = require('../controllers/authController')
const {rateLimiter} = require("../utils/rateLimiter")
const router = express.Router()

router.post('/login', rateLimiter, authController.login)
router.patch('/refresh', authController.refresh)


module.exports=router