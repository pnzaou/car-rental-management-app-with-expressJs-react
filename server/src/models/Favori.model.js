const mongoose = require('mongoose')
const { Schema, model } = mongoose

const favoriModel = new Schema({
    clientId: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    voitureId: {type: Schema.Types.ObjectId, ref: 'Voiture', required: true}
},{timestamps: true})

module.exports = model('Favori', favoriModel)