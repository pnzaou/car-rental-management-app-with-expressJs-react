const mongoose = require('mongoose')
const { Schema, model } = mongoose

const categorieModel = new Schema({
    nom: {type: String, required: true},
    description: {type: String, default: null}
}, {timestamps: true})

module.exports = model('Categorie', categorieModel)