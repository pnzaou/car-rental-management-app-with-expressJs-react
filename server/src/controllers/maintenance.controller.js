const Maintenance = require('../models/Maintenance.model')
const Voiture = require('../models/Voiture.model')

/**
 * Ajoute une nouvelle maintenance pour une voiture.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la maintenance ajoutée.
 */
const addMaintenance = async (req, res) => {
    const { type, date, description, statut } = req.body
    const { voitureId } = req.params

    try {
        if(!type || !date || !description || !statut){
            res.status(400).json({
                message: "Tous les champs sont obligatoires."
            })
        }

        const voiture = await Voiture.findById(voitureId)
        if(!voiture) {
            return res.status(400).json({
                message: "Aucune voiture trouvée avec l'identifiant fourni."
            })
        }
        const rep = await Maintenance.create({
            type,
            date,
            description,
            statut,
            voitureId
        })

        return res.status(201).json({
            message: "Maintenance enregistrée avec succès", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans maintenance.controller (addMaintenance)", error)
        return res.status(500).json({
            message: "Erreur lors de l'enregistrement",
            erreur: error
        })
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

        return res.status(200).json({
            message: "Maintenances récupérées avec succès", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans maintenance.controller (getMaintenances)", error)
        return res.status(500).json({
            message: "Erreur lors de la récupération des données",
            erreur: error
        })
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

        return res.status(200).json({
            message: "Maintenance modifiée avec succès",
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans maintenance.controller (updateMaintenance)", error)
        return res.status(500).json({
            message: "Erreur lors de la modification des données", 
            erreur: error
        })
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

        return res.status(200).json({
            message: "Maintenance supprimée avec succès", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans maintenance.controller (deleteMaintenance)", error)
        return res.status(500).json({
            message: "Erreur lors de la suppression",
            erreur: error
        })
    }
}

module.exports = {
    addMaintenance,
    getMaintenances,
    updateMaintenance,
    deleteMaintenance
}