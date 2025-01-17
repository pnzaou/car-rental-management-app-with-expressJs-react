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
        if(!nom) {
            return res.status(400).json({
                message: "Veuillez saisir le nom de l'unité"
            })
        }

        const rep = await uniteTarification.create({nom})

        return res.status(201).json({
            message: "Unité de tarification ajouté avec succès", 
            data: rep
        })

    } catch (error) {
        console.log("Erreur dans uniteTarification.controller (addUnite)", error)
        return res.status(500).json({
            message: "Erreur lors de l'ajout de l'unité", 
            erreur: error
        })

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
        const msg = rep.length === 0 
        ? "Aucune unité enregistrée veuillez en ajouter" 
        :"Unités de tarification récupérées avec succès"

        return res.status(200).json({
            message: msg, 
            data: rep
        })

    } catch (error) {
        console.log("Erreur dans uniteTarification.controller (getUnites)", error)
        return res.status(500).json({
            message: "Erreur lors de la récupération des données", 
            erreur: error
        })

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

        if(!nom) {
            return res.status(400).json({
                message: "Veuillez renseigner le nom de l'unité (Ex: 1 jour)."
            })
        }

        const rep = await uniteTarification.findByIdAndUpdate(id, { nom }, {new: true})

        if(!rep) {
            return res.status(400).json({
                message: "Aucune unité de tarification trouvée avec l'id fourni."
            })
        }

        return res.status(200).json({
            message: "Unité de tqrificqtion modifiée avec succès", 
            data: rep
        })

    } catch (error) {
        console.log("Erreur dans uniteTarification.controller (updateUnite)", error)
        return res.status(500).json({
            message: "Erreur lors de la modification", 
            erreur: error
        })

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
        if(!rep) {
            return res.status(400).json({
                message: "Aucune unité de tarification trouvée avec l'id fourni."
            })
        }

        return res.status(200).json({
            message: "Unité de tarification supprimée avec succès", 
            data: rep
        })

    } catch (error) {
        console.log("Erreur dans uniteTarification.controller (deleteUnite)", error)
        return res.status(500).json({
            message: "Erreur lors de la suppression", 
            erreur: error
        })

    }
}

module.exports = {
    addUnite,
    getUnites,
    updateUnite,
    deleteUnite
}