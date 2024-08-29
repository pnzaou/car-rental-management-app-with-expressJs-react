const Charge = require('../models/Charge.model')

/**
 * Ajout d'une nouvelle charge.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la charge ajoutée.
 */
const addCharge = async (req, res) => {
    const {type, montant, voitureId} = req.body

    try {
        const rep = await Charge.create({type, montant, voitureId})
        const msg = "Charge enregistrée avec succès"

        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de l'enregistrement"
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Récupération de toutes les charges.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données des charges récupérées.
 */
const getCharges = async (req, res) => {
    try {
        const rep = await Charge.find()
        const msg = "Charges récupérées avec succès"

        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération des données"
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Mise à jour d'une charge existante.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la charge mise à jour.
 */
const updateCharge = async (req, res) => {
    const {id} = req.params
    const {type, montant, voitureId} = req.body
    try {
        const rep = await Charge.findByIdAndUpdate(id, {
            type, montant, voitureId}, {new: true})
        const msg = "Charge modifiée avec succès"
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la modification des données"
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Suppression d'une charge.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la charge supprimée.
 */
const deleteCharge = async (req, res) => {
    const {id} = req.params
    try {
        const rep = await Charge.findByIdAndDelete(id)
        const msg = "Charge supprimée avec succès"

        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la suppression"
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    addCharge,
    getCharges,
    updateCharge,
    deleteCharge
}