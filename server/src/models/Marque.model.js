const mongoose = require('mongoose')
const { Schema, model } = mongoose

const marqueModel = new Schema({
    nom: {type: String, required: true},
    logo: String,
    paysDorigine: {type: String, default: null}
}, {timestamps: true})

module.exports = model('Marque', marqueModel)
