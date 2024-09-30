const Modele = require('../models/Modele.model')
const Voiture = require('../models/Voiture.model')

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
        const rep = await Modele.create({nom, description, marqueId})
        const msg = "Modèle Enregistré avec succès."
        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg ="Erreur lors de l'enregistrement"
        return res.status(500).json({message: msg, erreur: error})
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
        const msg = "Modèles récupérés avec succès"
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération des données"
        return res.status(500).json({message: msg, erreur: error})
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
        const rep = await Modele.findByIdAndUpdate(id, {nom, description, marqueId}, {new: true})
        const msg = "Modèle modifié avec succès"
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la modification du modèle"
        return res.status(500).json({message: msg, erreur: error})
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
        const msg = "Modèle supprimé avec succès"
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la supression'
        return res.status(500).json({message: msg, erreur: error})
    }
}


module.exports = {
    addModele,
    getModeles,
    updateModele,
    deleteModele
}