const mongoose = require('mongoose')
const { Schema, model } = mongoose

const reservationVoitureUniteTarification = new Schema({
    nbrVoitureUniteTarification: {type: Number, required: true},
    prix: {type:Number, required: true},
    reservationId: {type: Schema.Types.ObjectId, ref: 'Reservation'},
    voitureUniteTarificationId: {type: Schema.Types.ObjectId, ref: 'VoitureUniteTarification'}
},{timestamps: true})

module.exports = model('ReservationVoitureUniteTarification', reservationVoitureUniteTarification)
