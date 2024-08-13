const mongoose = require('mongoose')
const { Schema, model } = mongoose

const noteModel = new Schema({
    nombreEtoiles: {type: Number, required: true},
    clientId: {type: Schema.Types.ObjectId, ref: 'Client'},
    reservationId: {type:Schema.Types.ObjectId, ref: 'Reservation'}
}, {timestamps: true})

module.exports = model('Note', noteModel)