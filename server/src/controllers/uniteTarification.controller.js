const uniteTarification = require('../models/uniteTarification.model')

/**
 * Ajout d'une nouvelle unité de tarification.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de l'unité ajoutée.
 */
const addUnite = async (req, res) => {
    const { nom } = req.body
    try {

        const rep = await uniteTarification.create({nom})
        const msg = "Unité de tarification ajouté avec succès"
        return res.status(201).json({message: msg, data: rep})

    } catch (error) {

        const msg = "Erreur lors de l'ajout de l'unité"
        return res.status(500).json({message: msg, erreur: error})

    }
}

/**
 * Récupération de toutes les unités de tarification.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données des unités récupérées.
 */
const getUnites = async (req, res) => {
    try {

        const rep = await uniteTarification.find()
        const msg = "Unités de tarification récupérées avec succès"
        return res.status(200).json({message: msg, data: rep})

    } catch (error) {

        const msg = "Erreur lors de la récupération des données"
        return res.status(500).json({message: msg, erreur: error})

    }
}

/**
 * Mise à jour d'une unité de tarification.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données mises à jour de l'unité.
 */
const updateUnite = async (req, res) => {
    const { id } = req.params 
    const { nom } = req.body 
    try {
        const rep = await uniteTarification.findByIdAndUpdate(id, { nom }, {new: true})
        const msg = "Unité de tqrificqtion modifiée avec succès"
        return res.status(200).json({message: msg, data: rep})

    } catch (error) {
        
        const msg = "Erreur lors de la modification"
        return res.status(500).json({message: msg, erreur: error})

    }
}

/**
 * Suppression d'une unité de tarification.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de l'unité supprimée.
 */
const deleteUnite = async (req, res) => {
    const { id } = req.params 
    try {

        const rep = await uniteTarification.findByIdAndDelete(id)
        const msg = "Unité de tarification supprimée avec succès"
        return res.status(200).json({message: msg, data: rep})

    } catch (error) {
        
        const msg = "Erreur lors de la suppression"
        return res.status(500).json({message: msg, erreur: error})

    }
}

module.exports = {
    addUnite,
    getUnites,
    updateUnite,
    deleteUnite
}