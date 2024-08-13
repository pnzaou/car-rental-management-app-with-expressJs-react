const mongoose = require('mongoose')
const { Schema, model } = mongoose

const optionLocationModel = new Schema({
    nom: {type: String, required: true}
},{timestamps: true})

module.exports = model('OptionLocation', optionLocationModel)