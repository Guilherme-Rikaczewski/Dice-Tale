const express = require('express')
const gameController = require('../controllers/gameController')
const {authMiddleware} = require('../utils/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, gameController.createGame) //testado
router.post('/join/:code', authMiddleware, gameController.joinGame) //testado
router.get('/:code', authMiddleware, gameController.getGameByCode) //testado
router.get('/', authMiddleware, gameController.getGameByName) //testado
router.get('/all', authMiddleware, gameController.getAllGames)
router.get('/rule', authMiddleware, gameController.getGameRule)
router.patch('/', authMiddleware, gameController.updateGame)
router.delete('/', authMiddleware, gameController.deleteGame)

// router.get('/', userController.getView)


module.exports = router

