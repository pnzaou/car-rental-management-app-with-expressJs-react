const mongoose = require('mongoose')
const { Schema, model } = mongoose

const droitModel = new Schema({
    autorisation: {type: String, required: true, unique: true},
}, {timestamps: true})

module.exports = model('Droit', droitModel)