const mongoose = require('mongoose')
const { Schema, model } = mongoose

const modeleModel = new Schema({
    nom: {type: String, required: true},
    description: String,
    marqueId: {type: Schema.Types.ObjectId, ref: 'Marque', required: true}
}, {timestamps: true})

module.exports = model('Modele', modeleModel)