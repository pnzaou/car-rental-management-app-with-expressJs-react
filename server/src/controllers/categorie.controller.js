const Categorie = require('../models/Categorie.model')

/**
 * Ajout d'une nouvelle catégorie.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la catégorie ajoutée.
 */
const addCategorie = async (req, res) => {
    const { nom, description } = req.body

    try {
        const rep = await Categorie.create({nom, description})
        const msg = "Catégorie ajoutée avec succès"
        
        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de l'enregistrement"
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Mise à jour d'une catégorie existante.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la catégorie mise à jour.
 */
const updateCategorie = async (req, res) => {
    const { id } = req.params
    const { nom, description } = req.body

    try {
        const rep = await Categorie.findByIdAndUpdate(id, {nom, description},{ new: true })
        const msg = "Modification de la catégorie réussie"

        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la modification"
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Récupération de toutes les catégories.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données des catégories récupérées.
 */
const getCategories = async (req, res) => {
    try {
        const rep = await Categorie.find()
        const msg = rep.length === 0 ? "Aucune catégorie enregistrée veuillez en ajouter" 
        : "Catégories récupérés avec succès."
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération"
        return res.status(500).json({message: msg, erreur: error})
    }
}

const getCategorieById = async (req, res) => {
    const {id} = req.params
    try {
        const rep = await Categorie.findById(id)
        const msg = "La catégorie a été récupérée avec succèS"
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération"
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Suppression d'une catégorie.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la catégorie supprimée.
 */
const deleteCategorie = async (req, res) => {
    const { id } = req.params
    try {
        const rep = await Categorie.findByIdAndDelete(id)
        const msg = "Catégorie supprimé avec succès."
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la suppression"
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    addCategorie,
    updateCategorie,
    getCategories,
    getCategorieById,
    deleteCategorie
}