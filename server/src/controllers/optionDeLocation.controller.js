const OptionLocation = require('../models/optionLocation.model')

/**
 * Ajout d'une nouvelle option de location.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de l'option ajoutée.
 */
const addOption = async (req, res) => {
    const { nom } = req.body
    try {

        const rep = await OptionLocation.create({nom})
        const msg = "Option de location ajouté avec succès"
        return res.status(201).json({message: msg, data: rep})

    } catch (error) {

        const msg = "Erreur lors de l'ajout de l'option"
        return res.status(500).json({message: msg, erreur: error})

    }
}

/**
 * Récupération de toutes les options de location.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données des options récupérées.
 */
const getOptions = async (req, res) => {
    try {

        const rep = await OptionLocation.find()
        const msg = "Options de location récupérées avec succès"
        return res.status(200).json({message: msg, data: rep})

    } catch (error) {

        const msg = "Erreur lors de la récupération des options"
        return res.status(500).json({message: msg, erreur: error})

    }
}

/**
 * Mise à jour d'une option de location.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données mises à jour de l'option.
 */
const updateOption = async (req, res) => {
    const { id } = req.params 
    const { nom } = req.body 
    try {
        const rep = await OptionLocation.findByIdAndUpdate(id, { nom }, {new: true})
        const msg = "Option de location modifié avec succès"
        return res.status(200).json({message: msg, data: rep})

    } catch (error) {
        
        const msg = "Erreur lors de la modification"
        return res.status(500).json({message: msg, erreur: error})

    }
}

/**
 * Suppression d'une option de location.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de l'option supprimée.
 */
const deleteOption = async (req, res) => {
    const { id } = req.params 
    try {

        const rep = await OptionLocation.findByIdAndDelete(id)
        const msg = "Option de location supprimée avec succès"
        return res.status(200).json({message: msg, data: rep})

    } catch (error) {
        
        const msg = "Erreur lors de la suppression"
        return res.status(500).json({message: msg, erreur: error})

    }
}

module.exports = {
    addOption,
    getOptions,
    updateOption,
    deleteOption
}