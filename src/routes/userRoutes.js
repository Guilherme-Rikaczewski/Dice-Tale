const express = require('express')
const userController = require('../controllers/userController')
const {authMiddleware} = require('../utils/authMiddleware')
const router = express.Router()

router.post('/', userController.createUser)
router.get('/', authMiddleware, userController.getUserById)
router.get('/profilepic', authMiddleware, userController.getProfilePic)
router.patch('/', authMiddleware, userController.updateUser)
router.delete('/', authMiddleware, userController.deleteUser)

// router.get('/', userController.getView)


module.exports = router

