const mongoose = require('mongoose')
const { Schema, model } = mongoose

const voitureModel = new Schema({
    immatriculation: {type: String, default: null},
    images: {type: [String], required: true},
    DateMiseCirculation: {type: Date, default: null},
    typeCarburant: {type: String, required: true},
    capaciteDassise: {type: Number, required: true},
    categorieId: {type: Schema.Types.ObjectId, ref: 'Categorie'},
    modeleId: {type: Schema.Types.ObjectId, ref: 'Modele'}
}, {timestamps: true})

module.exports = model('Voiture', voitureModel)