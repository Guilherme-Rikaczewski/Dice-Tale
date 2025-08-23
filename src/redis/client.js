const { createClient } = require('redis')
const crypto = require('crypto')
require('dotenv').config()

const client = createClient({
    url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
})

// tempo de duração em segundos de um refresh token --> 7 dias
const REFRESH_TTL_SECONDS = 60*60*24*7

// refresh token
function genereteOpaqueToken() {
    return crypto.randomBytes(64).toString('hex')
}

// cria hash do token
function sha256(str){
    return crypto.createHash('sha256').update(str).digest('hex')
}

// salva refresh token no redis
async function saveRefreshToken(userId, refreshToken) {
    const tokenHash = sha256(refreshToken)
    const key = `refresh:${userId}:${tokenHash}`
    await client.setEx(key, REFRESH_TTL_SECONDS, '1')
}

// verifica se o refresh token existe
async function validateRefreshToken(userId, refreshToken) {
    const tokenHash = sha256(refreshToken)
    const key = `refresh:${userId}:${tokenHash}`
    const exists = await client.exists(key)
    return exists === 1
}

// delete refresh token do redis
async function deleteRefreshToken(userId, refreshToken) {
    const tokenHash = sha256(refreshToken)
    const key = `refresh:${userId}:${tokenHash}`
    await client.del(key)
}