const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const sheetRouter = require('./routes/sheetRoutes')
const gameRouter = require('./routes/gameRoutes')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())
app.use(cookieParser()) // req.cookies
app.use(express.json()) // req.body

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/sheets', sheetRouter)
app.use('/api/games', gameRouter)

app.use((req, res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

module.exports=app
