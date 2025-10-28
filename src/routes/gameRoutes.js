const express = require('express')
const gameController = require('../controllers/gameController')
const {authMiddleware} = require('../utils/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, gameController.createGame) //testado
router.post('/join/:code', authMiddleware, gameController.joinGame) //testado
router.get('/open/:code', authMiddleware, gameController.getGameByCode) //testado
router.get('/', authMiddleware, gameController.getGameByName) //testado
router.get('/all', authMiddleware, gameController.getAllGames) // testado
router.get('/recent', authMiddleware, gameController.getRecentGames) //testado
router.get('/rule', authMiddleware, gameController.getGameRule) //testado
router.patch('/', authMiddleware, gameController.updateGame) // testado
router.delete('/', authMiddleware, gameController.deleteGame) //testado


module.exports = router

