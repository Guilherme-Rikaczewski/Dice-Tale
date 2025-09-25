const express = require('express')
const sheetController = require('../controllers/sheetController')
const {authMiddleware} = require('../utils/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, sheetController.createSheet)
router.get('/all', authMiddleware, sheetController.getAllSheets)
router.get('/', authMiddleware, sheetController.getSheetById)
router.get('/recent',  authMiddleware, sheetController.getRecentSheets)
router.patch('/',  authMiddleware, sheetController.updateSheet)
router.delete('/', authMiddleware, sheetController.deleteSheet)

// router.get('/', userController.getView)


module.exports = router

