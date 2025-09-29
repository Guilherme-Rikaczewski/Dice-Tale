const express = require('express')
const gameController = require('../controllers/gameController')
const {authMiddleware} = require('../utils/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, gameController.createGame)
router.get('/', authMiddleware, gameController.getGameById)
router.get('/rules', authMiddleware, gameController.getGameRules)
router.patch('/', authMiddleware, gameController.updateGame)
router.delete('/', authMiddleware, gameController.deleteGame)

// router.get('/', userController.getView)


module.exports = router

