const express = require('express')
const gameController = require('../controllers/gameController')
const {authMiddleware} = require('../utils/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, gameController.createGame)
router.post('/join/:code', authMiddleware, gameController.joinGame)
router.get('/:code', authMiddleware, gameController.getGameByCode)
router.get('/rule', authMiddleware, gameController.getGameRule)
router.patch('/', authMiddleware, gameController.updateGame)
router.delete('/', authMiddleware, gameController.deleteGame)

// router.get('/', userController.getView)


module.exports = router

