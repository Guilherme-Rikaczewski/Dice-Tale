const { where } = require('sequelize')
const { Sheet } = require('../models/index')
const { isIdInvalid, notExist } = require('../utils/validators')

async function createSheet(req, res) {
    try {
        const sheet = await Sheet.create(req.body)
        res.status(201).json(sheet)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


async function getSheetById(req, res) {
    try {
        if (isIdInvalid(req.body.id)){
            res.status(400).json({error: 'Sorry, invalid ID'})
        }
        const sheet = await Sheet.findByPk(req.body.id)
        if (notExist(sheet)){
            res.status(404).json({error: 'Sorry, sheet not found'})
        }

        res.status(200).json(sheet)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function getAllSheets(req, res) {
    try {
        const userId = req.userId
        if (isIdInvalid(userId)){
            res.status(400).json({error: 'Sorry, invalid ID'})
        }
        const allSheets = await Sheet.findAll({where: {userId}})
        
        res.status(200).json(allSheets)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function getRecentSheets(req, res) {
    try {
        if (isIdInvalid(req.userId)){
            res.status(400).json({error: 'Sorry, invalid ID'})
        }
        const allSheets = await Sheet.findAll({
            where: {userOwnerId: req.userId},
            order: [
                ['lastAccess', 'DESC'],
                ['id', 'DESC']
            ],
            limit: 4
        })
        
        res.status(200).json(allSheets)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

