const { User } = require("../models/index")
const { isIdInvalid, notExist } = require('../utils/validators')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function login(req, res) {
    try{
        const { email, password } = req.body
        const user = await User.findOne({where:{email}})
        if (notExist(user)){
            return res.status(401).json({error:'Invalid credentials.'})
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) {
            return res.status(401).json({error:'Invalid credentials.'})
        }

        const token = jwt.sign(
            {id:user.id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )
        res.status(200).json({token})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}


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
        if (isIdInvalid(req.params.id)){
            return res.status(400).json({error: 'Sorry, invalid ID'})
        }
        const user = await User.findByPk(req.params.id)
        if (notExist(user)) {
            return res.status(404).json({error: 'Sorry, user not found'})
        }

        res.status(200).json(user)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

// testado 
async function updateUser(req, res) {
    try{
        if (isIdInvalid(req.params.id)){
            return res.status(400).json({error: 'Sorry, invalid ID'})
            // return console.log('id invalido')
        }
        const user = await User.findByPk(req.params.id)
        if (notExist(user)) {
            return res.status(404).json({error: 'Sorry, user not found'})
            // return console.log('nao existe')

        }

        await user.update(req.body)
        res.status(200).json(user)
        // return console.log('funcionou', user)

    } catch (err) {
        res.status(500).json({error: err.message})
        // return console.log(err)

    }
}

// updateUser({body:{password: 'username1teste'}, params:{id:1}})

async function deleteUser(req, res) {
    try{
        if (isIdInvalid(req.params.id)){
            return res.status(400).json({error: 'Sorry, invalid ID'})
        }
        const user = User.findByPk(req.params.id)
        if (notExist(user)){
            return res.status(404).json({error: 'Sorry, user not found'})
        }

        await user.destroy()
        res.status(204).send()
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}



module.exports={ createUser, getUserById, updateUser, deleteUser }

