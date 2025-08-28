const {rateLimit} = require("express-rate-limit")

const limiter = rateLimit({
    windowMs: 15*60*1000,
    limit:10,
    message: {error:"Too many requests. Try again later."},
    standardHeaders: true,
    legacyHeaders:false
})

module.exports={limiter}