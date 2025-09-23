const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const sheetRouter = require('./routes/sheetRoutes')


const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())
app.use(cookieParser()) // req.cookies
app.use(express.json()) // req.body

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/sheets', sheetRouter)

app.use((req, res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

module.exports=app
