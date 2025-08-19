const express = require('express')
const cors = require('cors')
const path = require('path')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/users', userRoutes)
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'index.html'));
});

module.exports=app
