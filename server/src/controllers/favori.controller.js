const Favori = require('../models/Favori.model')
const Voiture = require('../models/Voiture.model')

/**
 * Ajoute une voiture aux favoris du client.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données du favori ajouté.
 */
const addFavori = async (req, res) => {
    const { id } = req.params
    const {clientId} = req.authData

    try {
        const voiture = Voiture.findById(id)
        if(!voiture) {
            return res.status(400).json({
                message: "impossible d'ajouter cette voiture en favori"
            })
        }
        const rep = await Favori.create({clientId, voitureId: id})
        
        return res.status(201).json({
            message: "Voiture ajoutée aux favoris", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans favori.controller (addFavori)", error)
        return res.status(500).json({
            message: "Erreur lors de l'ajout", 
            erreur: error
        })
    }
}

/**
 * Récupère la liste des voitures favorites d'un client.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données des favoris.
 */
const getFavoris = async (req, res) => {
    const {clientId} = req.authData
    try {
        const rep = await Favori.find({clientId})

        return res.status(200).json({
            message: "Liste des favoris récupérée avec succès.", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans favori.controller (getFavoris)", error)
        return res.status(500).json({
            message: "Erreur lors de la récupération", 
            erreur: error
        })
    }
}

/**
 * Supprime une voiture des favoris du client.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données du favori supprimé.
 */
const deleteFavori = async (req, res) => {
    const {clientId} = req.authData
    const { id } = req.params
    try {
        const rep = await Favori.deleteOne({clientId, voitureId: id})

        return res.status(200).json({
            message: "La voiture a été supprimé de vos favoris.", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans favori.controller (deleteFavori)", error)
        return res.status(500).json({
            message: "Erreur lors de la suppression", 
            erreur: error
        })
    }
}

module.exports = {
    addFavori,
    getFavoris,
    deleteFavori
}

