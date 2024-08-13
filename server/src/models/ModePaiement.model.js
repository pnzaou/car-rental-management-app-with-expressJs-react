const mongoose = require('mongoose')
const { Schema, model } = mongoose

const modePaiement = new Schema({
    nom: {type: String, required: true}
},{timestamps: true})

module.exports = model('ModePaiement', modePaiement)