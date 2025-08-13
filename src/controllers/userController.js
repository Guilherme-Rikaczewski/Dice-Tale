const { getAllUsers } = require("../models/userModel")


async function listUsers(req, res) {
    try{
        const users = await getAllUsers()
        res.json(users)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "erro ao buscar usuarios"})
    }
}

module.exports={ listUsers }

