const express = require('express')
const cors = require('cors')
const connexion = require('./src/db/db')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 5000

app
.use(cors())
.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello App')
})

connexion()

app.listen(port, () => {
    console.log(`Notre serveur est executé sur http://localhost:${port}`);
})