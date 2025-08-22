const { User } = require("../models/index")


async function createUser(req, res) {
    try{
        const user = await User.create(req.body)
        res.status(201).json(User)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function getUserById(req, res) {
    try{
        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.status(404).json({error: 'Desculpe, usuário não encontrado'})
        }
        res.status(200).json(user)
    }
}

async function updateUser(req, res) {
    try{
        const user = await User.findByPk(req.params.id)
        if (!user) {
            return res.status(404).json({error: 'Desculpe, usuário não encontrado'})
        }

        await user.update(req.body)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function deleteUser(req, res) {
    try{
        const user = User.findByPk(req.params.id)
        if (!user){
            return res.status(404).json({error: 'Desculpe, usuário não encontrado'})
        }

        await user.destroy()
        res.status(204).send()
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}



module.exports={ createUser, getUserById, updateUser, deleteUser }

