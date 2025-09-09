const { User } = require("../models/index")
const { isIdInvalid, notExist } = require('../utils/validators')

// testado
async function createUser(req, res) {
    try{
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// testado
async function getUserById(req, res) {
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

async function getProfilePic(req, res) {
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
async function updateUser(req, res) {
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


async function deleteUser(req, res) {
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



module.exports={ createUser, getUserById, updateUser, deleteUser, getProfilePic }

