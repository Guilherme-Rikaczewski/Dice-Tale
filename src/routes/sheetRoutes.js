const express = require('express')
const sheetController = require('../controllers/sheetController')
const {authMiddleware} = require('../utils/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, sheetController.createSheet) //testado
router.get('/all', authMiddleware, sheetController.getAllSheets) //testado
router.get('/', authMiddleware, sheetController.getSheetById) //testado
router.get('/recent',  authMiddleware, sheetController.getRecentSheets) //testado
router.patch('/',  authMiddleware, sheetController.updateSheet) //testado
router.delete('/', authMiddleware, sheetController.deleteSheet) //testado


module.exports = router

