const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())
app.use(express.json())
app.use('/users', userRoutes)

app.use((req, res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

module.exports=app
