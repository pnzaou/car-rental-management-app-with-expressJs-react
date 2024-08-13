const mongoose = require('mongoose')
const { Schema, model } = mongoose

const uniteTarificationModel = new Schema({
    nom: {type: String, required: true}
}, {timestamps: true})

module.exports = model('UniteTarification', uniteTarificationModel)
