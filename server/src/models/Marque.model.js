const mongoose = require('mongoose')
const { Schema, model } = mongoose

const marqueModel = new Schema({
    nom: {type: String, required: true},
    logo: String,
    paysDorigine: String
}, {timestamps: true})

module.exports = model('Marque', marqueModel)
