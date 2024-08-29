const Notification = require('../models/Notification.model')
const Client = require('../models/Client.model')
const ClientNotification = require('../models/ClientNotification.model')
const { transporter } = require('../services/index')

const mailConfig = async (userId, clientIds, notificationData) => {
    try {
        let clients

        if (clientIds === 'all') {
            clients = await Client.find()
        } else if (Array.isArray(clientIds)) {
            clients = await Client.find({_id: { $in: clientIds } })
        } else {
            clients = await Client.find({_id: clientIds})
        }

        for (const client of clients) {

            const mailOptions = {
                from: 'perrinemmanuelnzaou@gmail.com',
                to: client.email,
                subject: notificationData.titre,
                text: notificationData.contenu 
            }

            await transporter.sendMail(mailOptions)

        }
        
        const notification = await Notification.create({
            contenu: notificationData.contenu,
            titre: notificationData.titre,
            type: notificationData.type,
            userId: userId
        })

        for (const client of clients) {
            await ClientNotification.create({
                clientId: client._id,
                notificationId: notification._id
            })
        }
        console.log('Emails envoyés avec succès.')
    } catch (error) {
        console.error("Erreur lors de l'envoi des emails :", error);
    }
}

const sendNotification = async (req, res) => {
    const {userId} =  req.authData
    const { clientIds, type, titre, contenu } = req.body

    try {
        await mailConfig(userId, clientIds, {type, titre, contenu})
        res.status(200).json({message: "Message envoyé avec succès"})
    } catch (error) {
        res.status(500).json({message: "Erreur lors de l'envoi des notifications.", Erreur: error})
    }
}

const getNotifications = async (req, res) => {
    try {
        const rep = await Notification.find()
        const msg = "Messages récupérés avec succès."
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupérqtion des données"
        return res.status(500).json({message: msg, Erreur: error})
    }
}
module.exports = {
    sendNotification,
    getNotifications
}