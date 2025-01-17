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
        if(!nom){
            res.status(400).json({
                message: "Veuillez fournir le nom de l'option."
            })
        }
        const rep = await OptionLocation.create({nom})

        return res.status(201).json({
            message: "Option de location ajouté avec succès", 
            data: rep
        })

    } catch (error) {
        console.log("Erreur dans optionDeLocation.controller (addOption)", error)
        return res.status(500).json({
            message: "Erreur lors de l'ajout de l'option", 
            erreur: error
        })

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
        const msg = rep.length === 0 ? "Aucune option enregistrée veuillez en ajouter" 
        : "Options récupérées avec succès"

        return res.status(200).json({
            message: msg, 
            data: rep
        })

    } catch (error) {
        console.log("Erreur dans optionDeLocation.controller (getOptions)", error)
        return res.status(500).json({
            message: "Erreur lors de la récupération des options", 
            erreur: error
        })

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
        return res.status(200).json({
            message: "Option de location modifiée avec succès", 
            data: rep
        })

    } catch (error) {
        console.log("Erreur dans optionDeLocation.controller (updateOption)", error)
        return res.status(500).json({
            message: "Erreur lors de la modification",
            erreur: error
        })

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

        return res.status(200).json({
            message: "Option de location supprimée avec succès", 
            data: rep
        })

    } catch (error) {
        console.log("Erreur dans optionDeLocation.controller (deleteOption)", error)
        return res.status(500).json({
            message: "Erreur lors de la suppression", 
            erreur: error
        })

    }
}

module.exports = {
    addOption,
    getOptions,
    updateOption,
    deleteOption
}