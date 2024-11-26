const mongoose = require('mongoose')
const { Schema, model } = mongoose

const reservationModel = new Schema({
    dateDebut: {type: Date, required: true},
    dateFin: {type: Date, required: true},
    montantTotal: {type: Number, required: true},
    statut: {type: String, default: "Confirmée"},
    etoile: {type: Number, default: null},
    clientId: {type: Schema.Types.ObjectId, ref: 'Client'}
},{timestamps: true})

module.exports = model('Reservation', reservationModel)