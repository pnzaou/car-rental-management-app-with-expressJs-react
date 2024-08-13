const mongoose = require('mongoose')
const { Schema, model } = mongoose

const voitureOptionLocationModel = new Schema({
    tarifOption: {type: Number, required: true},
    voitureId: {type: Schema.Types.ObjectId, ref: 'Voiture'},
    optionLocationId: {type: Schema.Types.ObjectId, ref: 'OptionLocation'}
},{timestamps: true})

module.exports = model('VoitureOptionLocation', voitureOptionLocationModel)
