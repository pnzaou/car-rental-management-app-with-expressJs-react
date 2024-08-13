const mongoose = require('mongoose')
const { Schema, model } = mongoose

const etatVoitureModel = new Schema({
    peinture: { type: String, required: true },
    carrosserie: { type: String, required: true },
    sieges: { type: String, required: true },
    tableauDeBord: { type: String, required: true },
    phare: { type: String, required: true },
    tapisserie: { type: String, required: true },
    pareBrise: { type: String, required: true },
    vitres: { type: String, required: true },
    essuieVitre: { type: String, required: true },
    pareChocAvant: { type: String, required: true },
    pareChocArriere: { type: String, required: true },
    climatisation: { type: String, required: true },
    toitOuvrant: { type: String, required: true },
    poignees: { type: String, required: true },
    reservationId: { type:Schema.Types.ObjectId, ref: 'Reservation' }
}, {
    timestamps: true
})

module.exports = model('EtatVoiture', etatVoitureModel)