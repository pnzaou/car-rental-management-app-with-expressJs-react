const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userModel = new Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    telephone: {type: String, required: true},
    password: {type: String, required: true},
    profilId: {type: Schema.Types.ObjectId, ref: 'Profil', required: true}
}, {timestamps: true})

module.exports = model('User', userModel)
