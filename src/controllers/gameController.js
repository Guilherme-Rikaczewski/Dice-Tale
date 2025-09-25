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

// testado
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
        if (isIdInvalid(req.userId)){
            return res.status(400).json({error: 'Sorry, invalid ID'})
        }
        const user = await User.findByPk(req.userId, {
            attributes: ['email', 'username', 'hoursPlayed']
        })
        if (notExist(user)) {
            return res.status(404).json({error: 'Sorry, user not found'})
        }

        res.status(200).json(user)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

async function getGameProfile(req, res) {
    try{
        if (isIdInvalid(req.userId)){
            return res.status(400).json({error: 'Sorry, invalid ID'})
        }

        const user = await User.findByPk(req.userId, {
            attributes: ['profilePicName', 'profilePicPath']
        })

        if (notExist(user)) {
            return res.status(404).json({error: 'Sorry, user not found'})
        }

        res.status(200).json(user)
    }catch (err) {
        res.status(500).json({error:err.message})
    }
    
}

// testado 
async function updateGame(req, res) {
    try{
        if (isIdInvalid(req.userId)){
            return res.status(400).json({error: 'Sorry, invalid ID'})
        }
        const user = await User.findByPk(req.userId)
        if (notExist(user)) {
            return res.status(404).json({error: 'Sorry, user not found'})

        }

        await user.update(req.body)
        res.status(200).json(user)

    } catch (err) {
        res.status(500).json({error: err.message})

    }
}


async function deleteGame(req, res) {
    try{
        if (isIdInvalid(req.userId)){
            return res.status(400).json({error: 'Sorry, invalid ID'})
        }
        const user = await User.findByPk(req.userId)
        if (notExist(user)){
            return res.status(404).json({error: 'Sorry, user not found'})
        }

        await user.destroy()
        res.status(204).send()
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}



module.exports={ createGame, getUserById, updateUser, deleteUser, getProfilePic }

