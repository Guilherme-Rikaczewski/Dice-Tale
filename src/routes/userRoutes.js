const express = require('express')
const userController = require('../controllers/userController')
const {authMiddleware} = require('../utils/authMiddleware')
const router = express.Router()

router.post('/', userController.createUser) //testad
router.get('/', authMiddleware, userController.getUserById) //testado
router.get('/profilepic', authMiddleware, userController.getProfilePic) //testado
router.patch('/', authMiddleware, userController.updateUser) //testado
router.delete('/', authMiddleware, userController.deleteUser)

// router.get('/', userController.getView)


module.exports = router

