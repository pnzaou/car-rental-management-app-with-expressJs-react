const mongoose = require('mongoose')
const {Schema, model} = mongoose

const profilDroitModel = new Schema({
    droitId: {type: Schema.Types.ObjectId, ref: 'Droit', required: true},
    profilId: {type: Schema.Types.ObjectId, ref: 'Profil', required: true}
}, {timestamps: true})

module.exports = model('ProfilDroit', profilDroitModel)