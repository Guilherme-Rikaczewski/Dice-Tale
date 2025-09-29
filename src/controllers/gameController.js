const { Game, GameRule } = require("../models/index")
const { isIdInvalid, notExist } = require('../utils/validators')


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
        req.body.code = genereteUniqueGameCode()
        const game = await Game.create(req.body)

        const gameRuleData = {
            userId: req.userId,
            role: 'M',
            gameId: game.id
        }
        const gameRule = await GameRule.create(gameRuleData)

        res.status(201).json({game, gameRule})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// testado
async function getGameById(req, res) {
    try{
        if (isIdInvalid(req.body.id)){
            return res.status(400).json({error: 'Sorry, invalid ID'})
        }
        const game = await Game.findByPk(req.body.id)
        if (notExist(game)) {
            return res.status(404).json({error: 'Sorry, game not found'})
        }

        res.status(200).json(game)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function getGameRules(req, res) {
    try{
        const gameId = req.body.id
        const userId = req.userId
        if (isIdInvalid(gameId)){
            return res.status(400).json({error: 'Sorry, invalid ID'})
        }

        const gameRules = await GameRule.findOne({
            where: {gameId, userId}
        })

        if (notExist(gameRules)) {
            return res.status(404).json({error: 'Sorry, game not found'})
        }

        res.status(200).json(gameRules)
    }catch (err) {
        res.status(500).json({error:err.message})
    }
    
}

// testado 
async function updateGame(req, res) {
    try{
        if (isIdInvalid(req.body.id)){
            return res.status(400).json({error: 'Sorry, invalid ID'})
        }
        const game = await Game.findByPk(req.body.id)
        if (notExist(game)) {
            return res.status(404).json({error: 'Sorry, game not found'})
        }

        await game.update(req.body)
        res.status(200).json(game)

    } catch (err) {
        res.status(500).json({error: err.message})

    }
}


async function deleteGame(req, res) {
    try{
        if (isIdInvalid(req.body.id)){
            return res.status(400).json({error: 'Sorry, invalid ID'})
        }
        const game = await Game.findByPk(req.body.id)
        if (notExist(game)){
            return res.status(404).json({error: 'Sorry, game not found'})
        }

        await game.destroy()
        res.status(204).send()
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}



module.exports={ createGame, getGameById, updateGame, deleteGame, getGameRules }

