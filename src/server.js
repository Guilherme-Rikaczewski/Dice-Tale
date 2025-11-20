const app = require('./app')
require('dotenv').config()


const port = process.env.SERVER_PORT || 3000
app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})
