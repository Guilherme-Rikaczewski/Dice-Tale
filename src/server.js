const app = require('./app')
require('dotenv').config()


const port = 3069
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
