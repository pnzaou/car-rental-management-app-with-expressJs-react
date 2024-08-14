const express = require('express')
const cors = require('cors')
const connexion = require('./src/db/db')
const router = require('./src/routes')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 5000

app
.use(cors())
.use(express.json())
.use(router)

app.get('/', (req, res) => {
    res.send('Hello App')
})

connexion()

app.listen(port, () => {
    console.log(`Notre serveur est executé sur http://localhost:${port}`);
})