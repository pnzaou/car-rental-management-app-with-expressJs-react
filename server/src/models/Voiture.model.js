const mongoose = require('mongoose')
const { Schema, model } = mongoose

const voitureModel = new Schema({
    immatriculation: {type: String, default: null, unique: true},
    images: {type: [String], required: true},
    DateMiseCirculation: {type: Date, default: null},
    typeBoite: {type: String, required: true},
    typeCarburant: {type: String, required: true},
    capaciteDassise: {type: Number, required: true},
    quantite: {type: Number, default: null},
    categorieId: {type: Schema.Types.ObjectId, ref: 'Categorie'},
    modeleId: {type: Schema.Types.ObjectId, ref: 'Modele'}
}, {timestamps: true})

module.exports = model('Voiture', voitureModel)