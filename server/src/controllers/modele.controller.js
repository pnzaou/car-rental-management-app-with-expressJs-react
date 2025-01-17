const Modele = require('../models/Modele.model')
const Voiture = require('../models/Voiture.model')
const Marque = require('../models/Marque.model')

/**
 * Ajoute un nouveau modèle.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données du modèle ajouté.
 */
const addModele = async (req, res) => {
    const { marqueId } = req.params
    const {nom, description} = req.body
    try {
        if(!nom || !description) {
            res.status(400).json({
                message: "Tous les champs sont obligatoires."
            })
        }

        const marque = await Marque.findById(marqueId)
        if(!marque) {
            res.status(400).json({
                message: "Aucune marque trouvée avec l'identifiant fourni."
            })
        }

        const rep = await Modele.create({nom, description, marqueId})

        return res.status(201).json({
            message: "Modèle Enregistré avec succès.",
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans modele.controller (addModele)", error)
        return res.status(500).json({
            message: "Erreur lors de l'enregistrement", 
            erreur: error
        })
    }
}

/**
 * Récupère les modèles d'une marque spécifique.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données des modèles récupérés.
 */
const getModeles = async (req, res) => {
    const {idMarque} = req.params
    try {
        const rep = await Modele.find({marqueId: idMarque})

        return res.status(200).json({
            message: "Modèles récupérés avec succès", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans modele.controller (getModeles)", error)
        return res.status(500).json({
            message: "Erreur lors de la récupération des données", 
            erreur: error
        })
    }
}

/**
 * Met à jour un modèle existant par son identifiant.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données du modèle mis à jour.
 */
const updateModele = async (req, res) => {
    const { id } = req.params
    const {nom, description, marqueId} = req.body
    try {
        const marque = await Marque.findById(marqueId)
        if(!marque) {
            res.status(400).json({
                message: "Aucune marque trouvée avec l'identifiant fourni."
            })
        }

        const rep = await Modele.findByIdAndUpdate(id, {nom, description, marqueId}, {new: true})

        return res.status(200).json({
            message: "Modèle modifié avec succès", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans modele.controller (updateModele)", error)
        return res.status(500).json({
            message: "Erreur lors de la modification du modèle", 
            erreur: error
        })
    }
}

/**
 * Supprime un modèle par son identifiant.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données du modèle supprimé.
 */
const deleteModele = async (req, res) => {
    const { id } = req.params
    try {
        const rep = await Modele.findByIdAndDelete(id)
        await Voiture.deleteMany({modeleId: rep._id})

        return res.status(200).json({
            message: "Modèle supprimé avec succès", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans modele.controller (deleteModele)", error)
        return res.status(500).json({
            message: 'Erreur lors de la supression',
            erreur: error
        })
    }
}


module.exports = {
    addModele,
    getModeles,
    updateModele,
    deleteModele
}