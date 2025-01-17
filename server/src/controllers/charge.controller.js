const Charge = require('../models/Charge.model')
const Voiture = require('../models/Voiture.model')

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
        if(!type || !montant) {
            return res.status(400).json({
                message: "Tous les champs sont obligatoires."
            })
        }

        if(!voitureId) {
            return res.status(400).json({
                message: "Veuillez sélectionner un véhicule."
            })
        }

        const voiture = await Voiture.findById(voitureId)

        if(!voiture) {
            return res.status(400).json({
                message: "Ce véhicule n'existe pas."
            })
        }
        
        const rep = await Charge.create({type, montant, voitureId})

        return res.status(201).json({
            message: "Charge enregistrée avec succès", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans charge.controller (addCharge)", error)
        return res.status(500).json({
            message: "Erreur lors de l'enregistrement", 
            erreur: error
        })
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

        return res.status(200).json({
            message: "Charges récupérées avec succès", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans charge.controller (getCharges)", error)
        return res.status(500).json({
            message: "Erreur lors de la récupération des données", 
            erreur: error
        })
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

        return res.status(200).json({
            message: "Charge modifiée avec succès", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans charge.controller (updateCharge)", error)
        return res.status(500).json({
            message: "Erreur lors de la modification des données", 
            erreur: error
        })
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

        return res.status(200).json({
            message: "Charge supprimée avec succès",
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans charge.controller (deleteCharge)", error)
        return res.status(500).json({
            message: "Erreur lors de la suppression", 
            erreur: error
        })
    }
}

module.exports = {
    addCharge,
    getCharges,
    updateCharge,
    deleteCharge
}