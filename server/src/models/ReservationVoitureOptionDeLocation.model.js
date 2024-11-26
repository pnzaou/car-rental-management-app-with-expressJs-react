const mongoose = require('mongoose')
const { Schema, model } = mongoose

const reservationVoitureOptionLocationModel = new Schema({
    nbrVoitureOptionLocation: {type: Number, required: true},
    prix: {type:Number, required: true},
    reservationId: {type: Schema.Types.ObjectId, ref: 'Reservation'},
    voitureOptionLocationId: {type: Schema.Types.ObjectId, ref: 'VoitureOptionLocation'}
},{timestamps: true})

module.exports = model('ReservationVoitureOptionLocation', reservationVoitureOptionLocationModel)