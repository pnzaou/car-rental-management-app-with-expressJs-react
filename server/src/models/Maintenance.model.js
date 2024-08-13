const mongoose = require('mongoose')
const { Schema, model } = mongoose

const maintenanceModel = new Schema({
    type: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, default: null},
    statut: {type: String, required: true},
    voitureId: {type: Schema.Types.ObjectId, ref: 'Voiture'}
}, {timestamps: true})

module.exports = model('Maintenance', maintenanceModel)