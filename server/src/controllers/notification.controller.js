const Notification = require('../models/Notification.model')
const Client = require('../models/Client.model')
const ClientNotification = require('../models/ClientNotification.model')
const { transporter } = require('../services/index')

/**
 * Configure et envoie des emails aux clients spécifiés.
 * @async
 * @param {string} userId - L'identifiant de l'utilisateur qui envoie la notification.
 * @param {string|string[]} clientIds - Identifiant(s) du ou des clients à qui envoyer la notification, ou "all" pour tous les clients.
 * @param {Object} notificationData - Les données de la notification.
 * @param {string} notificationData.titre - Le titre de la notification.
 * @param {string} notificationData.contenu - Le contenu de la notification.
 * @param {string} notificationData.type - Le type de la notification.
 * @returns {Promise<void>} Renvoie une réponse JSON après l'envoi des emails et la création des notifications.
 */
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

/**
 * Envoie une notification à un ou plusieurs clients.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message de succès ou d'erreur.
 */
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

/**
 * Récupère toutes les notifications.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec les notifications récupérées.
 */
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