const mongoose = require('mongoose')
const { Schema, model } = mongoose

const notificationModel = new Schema({
    titre: {type: String, required: true},
    contenu: {type: String, required: true},
    type: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
},{timestamps: true})

module.exports = model('Notification', notificationModel)