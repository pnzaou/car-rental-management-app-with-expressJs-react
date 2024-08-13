const mongoose = require('mongoose')
const { Schema, model } = mongoose

const voitureUniteTarificationModel = new Schema({
    tarifLocation: {type: Number, required: true},
    voitureId: {type: Schema.Types.ObjectId, ref: 'Voiture'},
    uniteTarificationId: {type: Schema.Types.ObjectId, ref: 'OptionLocation'}
},{timestamps: true}) 

module.exports = model('VoitureUniteTarification', voitureUniteTarificationModel)
