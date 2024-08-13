const mongoose = require('mongoose')
const { Schema, model } = mongoose

const clientNotificationModel = new Schema({
    clientId: {type: Schema.Types.ObjectId, ref: 'Client'},
    notificationId: {type: Schema.Types.ObjectId, ref: 'Notification'}
}, {timestamps: true})

module.exports = model('CleintNotification', clientNotificationModel)

