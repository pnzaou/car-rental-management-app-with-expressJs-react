const Droit = require('../models/Droit.model')

/**
 * Ajout d'un nouveau droit.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données du droit ajouté.
 */
const addDroit = async (req, res) => {
    const { autorisation } = req.body
    try {
        const rep = await Droit.create({autorisation})
        const msg = 'Droit enregistré avec succès'
        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de l\'enregistrement'
        return res.status(500).json({message: "Erreur lors de l\'enregistrement", erreur: error})
    }
}

/**
 * Récupération de tous les droits.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données des droits récupérés.
 */
const getDroits = async (req, res) => {
    try {
        const rep = await Droit.find()
        const msg = 'Droits recupérés avec succès.'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la récupération des données'
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Mise à jour d'un droit existant.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données du droit mis à jour.
 */
const updateDroit = async (req, res) => {
    const {autorisation } = req.body
    const id = req.params.id
    try {
        const rep = await Droit.findByIdAndUpdate(id, {autorisation}, {new: true})
        const msg = 'Modification réussie'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la modification'
        return res.status(500).json({message: msg, erreur: error})
    }

}

/**
 * Suppression d'un droit.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données du droit supprimé.
 */
const deleteDroit = async (req, res) => {
    const id = req.params.id
    try {
        const rep = await Droit.findByIdAndDelete(id)
        const msg = 'Suppression réussie'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la supression'
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    addDroit,
    getDroits,
    updateDroit,
    deleteDroit
}