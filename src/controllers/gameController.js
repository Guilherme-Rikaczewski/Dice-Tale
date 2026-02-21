const { Game, GameRule, SheetAccess, Sheet } = require("../models/index")
const { isIdInvalid, notExist, isCodeInvalid } = require('../utils/validators')
const { Op } = require('sequelize')


function generateCode(length = 6){
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code; 
}

async function genereteUniqueGameCode() {
    let code
    let exists = true

    while (exists){
        code = generateCode()
        exists = await Game.findOne({where: { code }})
    }

    return code
}


async function createGame(req, res) {
    try{
        req.body.code = await genereteUniqueGameCode()
        const game = await Game.create(req.body)

        const gameRuleData = {
            userId: req.userId,
            role: 'M',
            gameId: game.id
        }
        const gameRule = await GameRule.create(gameRuleData)

        res.status(201).json({game: game, gameRule: gameRule})
    } catch (err) {
        // res.status(500).json({ error: err.message })
        res.status(500).json({ error: 'Internal server error.' })
    }
}

async function joinGame(req, res) {
    try {
        if (isCodeInvalid(req.params.code)) {
            return res.status(400).json({ error: 'Invalid game code' })
        }
        const game = await Game.findOne({
            where: { code: req.params.code },
            attributes: ['id']
        })
        if (notExist(game)) {
            return res.status(404).json({ error: 'Game not found' })
        }

        const findRule = await GameRule.findOne({
            where: {
                userId: req.userId,
                gameId: game.id,
            }
        })

        if (findRule) {
            return res.status(409).json({ error: "User has already joined this game" })
        }

        const gameRuleData = {
            userId: req.userId,
            role: 'P',
            gameId: game.id,
        }
        const gameRule = await GameRule.create(gameRuleData)
        res.status(201).json(gameRule)
    } catch(err){
        // res.status(500).json({error: err.message})
        res.status(500).json({error: 'Internal server error.'})
    }

}

// testado
async function getGameByCode(req, res) {
    try{
        if (isCodeInvalid(req.params.code)){
            return res.status(400).json({error: 'Invalid game code'})
        }
        const game = await Game.findOne({
            where: {code: req.params.code},
            attributes: ['id']
        })
        if (notExist(game)) {
            return res.status(404).json({error: 'Game not found'})
        }

        const allSheets = await SheetAccess.findAll({
            where: { userId: req.userId },
            attributes: ['sheetId'],
            include: [
                {
                    model: Sheet,
                    attributes: ['name', 'imagePath'],
                    where: {gameId: game.id}
                }
            ]
        })

        const gameData = allSheets.map((sheetAccess)=>{
            return {
                id: sheetAccess.sheetId,
                name: sheetAccess.Sheet.name,
                imagePath: sheetAccess.Sheet.imagePath
            }  
        })

        const [updateRowCount, updatedRow] = await GameRule.update({lastAccess: new Date()}, {
            where: {
                userId: req.userId,
                gameId: game.id
            },
            returning: true
        })

        res.status(200).json({gameData: gameData, gameRule: updatedRow[0]})
    }catch(err){
        // res.status(500).json({error: err.message})
        res.status(500).json({error: 'Internal server error.'})
    }
}

async function getGameRule(req, res) {
    try{
        const gameId = req.body.id
        const userId = req.userId
        if (isIdInvalid(gameId)){
            return res.status(400).json({error: 'Invalid game.'})
        }

        const gameRules = await GameRule.findOne({
            where: {gameId, userId}
        })

        if (notExist(gameRules)) {
            return res.status(404).json({error: 'Game or user not found.'})
        }

        res.status(200).json(gameRules)
    }catch (err) {
        // res.status(500).json({error:err.message})
        res.status(500).json({error: 'Internal server error.'})
    }
    
}

async function getRecentGames(req, res) {
    try {
        if (isIdInvalid(req.userId)){
            res.status(400).json({error: 'Invalid user.'})
        }
        const recentGames = await GameRule.findAll({
            where:{ userId: req.userId },
            include: [
                {
                    model: Game,
                    attributes: ['id', 'name', 'code', 'imagePath'],
                }
            ],
            order: [['lastAccess', 'DESC']],
            limit: 9
        })

        const games = recentGames.map((gr)=>{
            return {
                id: gr.Game.id,
                code: gr.Game.code,
                name: gr.Game.name,
                imagePath: gr.Game.imagePath,
            }
        })
        
        res.status(200).json(games)
    } catch (err) {
        // res.status(500).json({ error: err.message })
        res.status(500).json({ error: 'Internal server error.' })
    }
}

async function getAllGames(req, res) {
    try {
        if (isIdInvalid(req.userId)){
            return res.status(400).json({error: 'Invalid user'})
        }
        const allGames = await GameRule.findAll({
            where:{ userId: req.userId },
            include: [
                {
                    model: Game,
                    attributes: ['name', 'code', 'imagePath'],
                }
            ],
            order: [[Game, 'name', 'DESC']],
        })

        const games = allGames.map((gr)=>{
            return {
                code: gr.Game.code,
                name: gr.Game.name,
                imagePath: gr.Game.imagePath,
            }
        })
        
        res.status(200).json(games)
    } catch (err) {
        // res.status(500).json({ error: err.message })
        res.status(500).json({ error: 'Internal server error.' })
    }
}

// testado 
async function updateGame(req, res) {
    try{
        if (isIdInvalid(req.body.id)){
            return res.status(400).json({error: 'Invalid game.'})
        }
        const game = await Game.findByPk(req.body.id)
        if (notExist(game)) {
            return res.status(404).json({error: 'Game not found'})
        }

        await game.update(req.body)
        res.status(200).json(game)

    } catch (err) {
        // res.status(500).json({ error: err.message })
        res.status(500).json({ error: 'Internal server error.' })

    }
}


async function deleteGame(req, res) {
    try{
        if (isIdInvalid(req.body.id)){
            return res.status(400).json({error: 'Invalid game'})
        }
        const game = await Game.findByPk(req.body.id)
        if (notExist(game)){
            return res.status(404).json({error: 'Game not found'})
        }

        await game.destroy()
        res.status(204).send()
    } catch (err) {
        // res.status(500).json({ error: err.message })
        res.status(500).json({ error: 'Internal server error.' })
    }
}


async function getGameByName(req, res) {
    try{
        if (isIdInvalid(req.userId)){
            return res.status(400).json({error: 'Invalid user'})
        }
        const recentGames = await GameRule.findAll({
            where:{ userId: req.userId },
            include: [
                {
                    model: Game,
                    attributes: ['name', 'code', 'imagePath'],
                    where: { name: {[Op.iLike]: `%${req.query.name}%`} }
                }
            ],
            order: [['lastAccess', 'DESC']],
            limit: 9
        })
        const games = recentGames.map((gr)=>{
            return {
                code: gr.Game.code,
                name: gr.Game.name,
                imagePath: gr.Game.imagePath,
            }
        })
        
        res.status(200).json(games)
    } catch (err) {
        // res.status(500).json({ error: err.message })
        res.status(500).json({ error: 'Internal server error.' })
    }
}


module.exports={ createGame, getGameByCode, updateGame, deleteGame, getGameRule, getRecentGames, joinGame, getGameByName, getAllGames}

