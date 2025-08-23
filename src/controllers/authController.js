const { User } = require("../models/index")
const bcrypt = require('bcrypt')
const { notExist } = require('../utils/validators')
const jwt = require('jsonwebtoken')
const { generateOpaqueToken, saveRefreshToken, validateRefreshToken, deleteRefreshToken } = require('../redis/client')
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

        // gera ACCESS token
        const token = jwt.sign(
            {id:user.id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        // gera REFRESH token
        const refreshToken = generateOpaqueToken()
        await saveRefreshToken(user.id, refreshToken)

        // envia dados da sessão para login
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,  // MUDA PARA TRUE QUANDO FOR RODAR EM PRODUÇÃO
            sameSite: "strict",
            maxAge: (7*24*60*60*1000)
        }).status(200).json({token})


    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function refresh(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken
        if (notExist(refreshToken)){
            return res.status(401).json({error:"No refresh token."})
        }

        const userId = await validateRefreshToken(refreshToken)
        if (notExist(userId)){
            return res.status(403).json({error: "Invalid refresh token."})
        }

        
        await deleteRefreshToken(refreshToken)

        const newRefreshToken = generateOpaqueToken()
        await saveRefreshToken(userId, newRefreshToken)

        const token = jwt.sign(
            { id: userId },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,  // MUDA PARA TRUE QUANDO FOR RODAR EM PRODUÇÃO
            sameSite: "strict",
            maxAge: (7*24*60*60*1000)
        }).status(200).json({ token })

    }catch (err) {
        res.status(500).json({error: err.message})
    }
}

