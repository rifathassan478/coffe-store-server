const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Want some coffe!')
})

app.listen(port, () => {
  console.log(`Coffe server is running ${port}`)
})
