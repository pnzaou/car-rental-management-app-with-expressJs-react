const Maintenance = require('../models/Maintenance.model')

/**
 * Ajoute une nouvelle maintenance pour une voiture.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la maintenance ajoutée.
 */
const addMaintenance = async (req, res) => {
    const {type, date, description, statut, voitureId} = req.body

    try {
        const rep = await Maintenance.create({
            type,
            date,
            description,
            statut,
            voitureId
        })

        const msg = "Maintenance enregistrée avec succès"
        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de l'enregistrement"
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Récupère toutes les maintenances enregistrées pour une voiture spécifique.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données des maintenances.
 */
const getMaintenances = async (req, res) => {
    const {idVoiture} = req.params
    try {
        const rep = await Maintenance.find({voitureId: idVoiture})
        const msg = "Maintenances récupérées avec succès"

        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération des données"
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Met à jour une maintenance existante.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la maintenance mise à jour.
 */
const updateMaintenance = async (req, res) => {
    const {id} = req.params
    const {type, date, description, statut, voitureId} = req.body
    try {
        const rep = await Maintenance.findByIdAndUpdate(id, {
            type, date, description, statut, voitureId
        }, {new: true})
        const msg = "Maintenance modifiée avec succès"
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la modification des données"
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Supprime une maintenance existante.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la maintenance supprimée.
 */
const deleteMaintenance = async (req, res) => {
    const {id} = req.params
    try {
        const rep = await Maintenance.findByIdAndDelete(id)
        const msg = "Maintenance supprimée avec succès"

        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la suppression"
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    addMaintenance,
    getMaintenances,
    updateMaintenance,
    deleteMaintenance
}