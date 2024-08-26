const mongoose = require('mongoose')
const { Schema, model } = mongoose

const clientModel = new Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tel: {type: String, required: true},
    numeroPermis: {type: String, required: true},
    expirationPermis: {type: Date, required: true},
    photoPermis: {type: String, required: true},
    photoCNI: {type:String, required: true},
    profil: {type: String, default: 'client'},
    etat: {type: Boolean, default: true}
},{timestamps: true})

module.exports = model('Client', clientModel)
