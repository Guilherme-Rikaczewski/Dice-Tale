const jwt = require('jsonwebtoken')
require('dotenv').config()

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization
    if (!authHeader){
        // return res.status(401).json({error: 'Insuficient token.'})
        return res.status(401).json({error: 'Invalid token.'})
    }

    const tokenParts = authHeader.split(' ')
    if (tokenParts.length !== 2){
        // return res.status(401).json({error:"Malformed token"})
        return res.status(401).json({error:"Invalid token"})
    }

    const [scheme, token] = tokenParts
    if (!/^Bearer$/i.test(scheme)){
        // return res.status(401).json({error:'Malformed token'})
        return res.status(401).json({error:'Invalid token'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({error:"Invalid token"})
        }
        req.userId = decoded.id
        return next() // finaliza o middleware e segue o proximo da stack
    })
}

module.exports= { authMiddleware }





