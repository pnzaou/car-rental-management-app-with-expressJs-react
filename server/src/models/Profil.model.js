const mongoose = require('mongoose')
const {Schema, model} = mongoose

const profilModel = new Schema({
    nom: {type: String, required: true}
}, {timestamps: true})

module.exports = model('Profil', profilModel)