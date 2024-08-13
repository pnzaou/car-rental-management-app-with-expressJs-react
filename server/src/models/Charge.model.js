const mongoose = require('mongoose')
const { Schema, model } = mongoose

const chargeModel = new Schema({
    type: {type: String, required: true},
    montant: {type: Number, required: true},
    voitureId: {type: Schema.Types.ObjectId, ref: 'Voiture'}
}, {timestamps: true})

module.exports = model('Charge', chargeModel)