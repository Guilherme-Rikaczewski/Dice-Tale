const express = require('express')
const jwt = require('jsonwebtoken')
const authController = require('../controllers/authController')
const router = express.Router()

router.post('/login', authController.login)
router.patch('/refresh', authController.refresh)


module.exports=router