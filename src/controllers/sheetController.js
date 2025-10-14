const { Sheet, SheetAccess, Game, User } = require('../models/index')
const { isIdInvalid, notExist } = require('../utils/validators')

async function createSheet(req, res) {
    try {
        const sheet = await Sheet.create(req.body)

        const access = {
            sheetId: sheet.id,
            userId: req.userId,
            owner: true
        }

        const sheetAccess = await SheetAccess.create(access)
        res.status(201).json({sheet: sheet, sheetAcces: sheetAccess})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


async function getSheetById(req, res) {
    try {
        if (isIdInvalid(req.body.id)){
            return res.status(400).json({error: 'Sorry, invalid sheet ID'})
        }
        const sheet = await Sheet.findByPk(req.body.id)
        if (notExist(sheet)){
            return res.status(404).json({error: 'Sorry, sheet not found'})
        }

        await SheetAccess.update({lastAccess: new Date()}, {
            where: {
                sheetId: sheet.id,
                userId: req.userId
            }
        })
        
        res.status(200).json(sheet)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function getAllSheets(req, res) {
    try {
        const userId = req.userId
        if (isIdInvalid(userId)){
            return res.status(400).json({error: 'Sorry, invalid user ID'})
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
                            attributes: ['name'],
                            required: false
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
                // verifica se o game existe, se sim retorna o nome, se nao nulo
                gameName: sheetAccess.Sheet.Game ? sheetAccess.Sheet.Game.name : null, 
                playersProfilePic: sheetAccess.Sheet.SheetsAccesses.map((access) => {
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
            return res.status(400).json({error: 'Sorry, invalid user ID'})
        }
        const recentSheets = await SheetAccess.findAll({
            where:{ userId: req.userId },
            include: [
                {
                    model: Sheet,
                    attributes: ['name', 'imagePath'],
                    include:[
                        {
                            model: Game,
                            attributes: ['name'],
                            required: false
                        }
                    ]
                }
            ],
            order: [['lastAccess', 'DESC']],
            limit: 4
        })

        const sheets = recentSheets.map((sheetAccess)=>{
            return {
                id: sheetAccess.sheetId,
                name: sheetAccess.Sheet.name,
                imagePath: sheetAccess.Sheet.imagePath,
                gameName: sheetAccess.Sheet.Game ? sheetAccess.Sheet.Game.name : null
            }
        })
        
        res.status(200).json(sheets)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function updateSheet(req, res) {
    try{
        if (isIdInvalid(req.body.id)){
            return res.status(400).json({error: 'Sorry, invalid sheet ID'})
        }
        const sheet = await Sheet.findByPk(req.body.id)
        if (notExist(sheet)){
            return res.status(404).json({error: 'Sorry, sheet not found'})
        }

        await sheet.update(req.body)
        res.status(200).json(sheet)
    }catch(err){
        res.status(500).json({ error: err.message })
    }
}

async function deleteSheet(req, res) {
    try{
        if (isIdInvalid(req.body.id)){
            return res.status(400).json({error: 'Sorry, invalid sheet ID'})
        }
        const sheet = await Sheet.findByPk(req.body.id)
        if (notExist(sheet)){
            return res.status(404).json({error: 'Sorry, sheet not found'})
        }

        await sheet.destroy()
        res.status(204).send()
    }catch(err){
        res.status(500).json({ error: err.message })
    }
}



module.exports = {
    createSheet,
    getAllSheets,
    getRecentSheets,
    getSheetById,
    updateSheet,
    deleteSheet
}
