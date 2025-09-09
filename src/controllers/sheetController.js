const { Sheet, SheetAccess, Game, User } = require('../models/index')
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
        const allSheets = await SheetAccess.findAll({
            where: {userId},
            include: [
                {
                    model: Sheet,
                    attributes: ['name', 'imagePath'],
                    include: [
                        {
                            model: Game,
                            attributes: ['name']
                        },
                        {
                            model: SheetAccess,
                            include: [
                                {
                                    model: User,
                                    attributes: ['profilePicPath']
                                }
                            ]
                        }
                    ],
                }
            ]
        })

        const sheets = allSheets.map((sheetAccess)=>{
            return {
                id: sheetAccess.sheetId,
                owner: sheetAccess.owner,
                name: sheetAccess.Sheet.name,
                imagePath: sheetAccess.Sheet.imagePath,
                gameName: sheetAccess.Sheet.Game.name,
                playersProfilePic: sheetAccess.Sheet.SheetAccess.map((access) => {
                    return access.User.profilePicPath
                }),
            }  
        })
        
        res.status(200).json(sheets)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function getRecentSheets(req, res) {
    try {
        if (isIdInvalid(req.userId)){
            res.status(400).json({error: 'Sorry, invalid ID'})
        }
        const recentSheets = await SheetAccess.findAll({
            where:{ userId: req.userId },
            include: [
                {
                    model: Sheet,
                    attributes: ['name', 'imagePath']
                }
            ],
            order: [['lastAccess', 'DESC']],
            limit: 4
        })

        const sheets = recentSheets.map((sheetAccess)=>{
            return {
                id: sheetAccess.sheetId,
                name: sheetAccess.Sheet.name,
                imagePath: sheetAccess.Sheet.imagePath
            }
        })
        
        res.status(200).json(sheets)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

