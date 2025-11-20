const { createClient } = require('redis')
const crypto = require('crypto')
const { notExist } = require('../utils/validators')
require('dotenv').config()

const client = createClient({
    url: process.env.REDIS_URL
})
client.connect()

// tempo de duração em segundos de um refresh token --> 7 dias
const REFRESH_TTL_SECONDS = 60*60*24*7

// refresh token
function generateOpaqueToken() {
    return crypto.randomBytes(64).toString('hex')
}

// cria hash do token
function sha256(str){
    return crypto.createHash('sha256').update(str).digest('hex')
}

// salva refresh token no redis
async function saveRefreshToken(userId, refreshToken) {
    const tokenHash = sha256(refreshToken)
    const key = `refresh:${tokenHash}`
    await client.setEx(key, REFRESH_TTL_SECONDS, userId.toString())
}

// verifica se o refresh token existe
async function validateRefreshToken(refreshToken) {
    const tokenHash = sha256(refreshToken)
    const key = `refresh:${tokenHash}`
    const userId = parseInt(await client.get(key), 10)
    if (notExist(userId)){ return null }
    return userId
}

// delete refresh token do redis
async function deleteRefreshToken(refreshToken) {
    const tokenHash = sha256(refreshToken)
    const key = `refresh:${tokenHash}`
    await client.del(key)
}

module.exports = { generateOpaqueToken, saveRefreshToken, validateRefreshToken, deleteRefreshToken }