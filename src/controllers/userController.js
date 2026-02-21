const { User } = require("../models/index")
const { isIdInvalid, notExist } = require('../utils/validators')

// testado
async function createUser(req, res) {
    try{
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch (err) {
        // res.status(500).json({ error: err.message })
        res.status(500).json({ error: 'Internal server error.' })
    }
}

// testado
async function getUserById(req, res) {
    try{
        if (isIdInvalid(req.userId)){
            return res.status(400).json({error: 'Invalid user.'})
        }
        const user = await User.findByPk(req.userId, {
            attributes: ['email', 'username', 'hoursPlayed']
        })
        if (notExist(user)) {
            return res.status(404).json({error: 'User not found.'})
        }

        res.status(200).json(user)
    }catch(err){
        // res.status(500).json({ error: err.message })
        res.status(500).json({ error: 'Internal server error.' })
    }
}

async function getProfilePic(req, res) {
    try{
        if (isIdInvalid(req.userId)){
            return res.status(400).json({error: 'Invalid user.'})
        }

        const user = await User.findByPk(req.userId, {
            attributes: ['profilePicPath']
        })

        if (notExist(user)) {
            return res.status(404).json({error: 'User not found.'})
        }

        res.status(200).json(user)
    }catch (err) {
        // res.status(500).json({ error: err.message })
        res.status(500).json({ error: 'Internal server error.' })
    }
    
}

// testado 
async function updateUser(req, res) {
    try{
        if (isIdInvalid(req.userId)){
            return res.status(400).json({error: 'Invalid user.'})
        }
        const user = await User.findByPk(req.userId)
        if (notExist(user)) {
            return res.status(404).json({error: 'User not found.'})

        }

        await user.update(req.body)
        res.status(200).json(user)

    } catch (err) {
        // res.status(500).json({ error: err.message })
        res.status(500).json({ error: 'Internal server error.' })

    }
}


async function deleteUser(req, res) {
    try{
        if (isIdInvalid(req.userId)){
            return res.status(400).json({error: 'Invalid user.'})
        }
        const user = await User.findByPk(req.userId)
        if (notExist(user)){
            return res.status(404).json({error: 'User not found.'})
        }

        await user.destroy()
        res.status(204).send()
    } catch (err) {
        // res.status(500).json({ error: err.message })
        res.status(500).json({ error: 'Internal server error.' })
    }
}



module.exports={ createUser, getUserById, updateUser, deleteUser, getProfilePic }

