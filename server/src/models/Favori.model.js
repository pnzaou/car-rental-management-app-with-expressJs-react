const mongoose = require('mongoose')
const { Schema, model } = mongoose

const favoriModel = new Schema({
    clientId: {type: Schema.Types.ObjectId, ref: 'Client'},
    voitureId: {type: Schema.Types.ObjectId, ref: 'Voiture'}
},{timestamps: true})

module.exports = model('Favori', favoriModel)