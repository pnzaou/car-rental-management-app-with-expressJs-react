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
        if(!nom) {
            return res.status(400).json({
                message: "Le nom de la catégorie est obligatoire."
            })
        }
        const rep = await Categorie.create({nom, description})
        
        return res.status(201).json({
            message: "Catégorie ajoutée avec succès", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans categorie.controller (addCategorie)", error)
        return res.status(500).json({
            message: "Erreur lors de l'enregistrement", 
            erreur: error
        })
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
        const rep = await Categorie.findByIdAndUpdate(id, {
            nom: nom.trim(), 
            description: description.trim()
        },{ new: true })

        return res.status(200).json({
            message: "Modification de la catégorie réussie", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans categorie.controller (updateCategorie)", error)
        return res.status(500).json({
            message: "Erreur lors de la modification", 
            erreur: error
        })
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

        return res.status(200).json({
            message: msg,
             data: rep
        })
    } catch (error) {
        console.log("Erreur dans etatVoiture.controller (getCategories)", error)
        return res.status(500).json({
            message: "Erreur lors de la récupération", 
            erreur: error
        })
    }
}

const getCategorieById = async (req, res) => {
    const {id} = req.params
    try {
        const rep = await Categorie.findById(id)
        
        return res.status(200).json({
            message: "La catégorie a été récupérée avec succès",
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans categorie.controller (getCategorieById)", error)
        return res.status(500).json({
            message: "Erreur lors de la récupération", 
            erreur: error})
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

        return res.status(200).json({
            message: "Catégorie supprimé avec succès.",
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans categorie.controller (deleteCategorie)", error)
        return res.status(500).json({
            message: "Erreur lors de la suppression",
            erreur: error
        })
    }
}

module.exports = {
    addCategorie,
    updateCategorie,
    getCategories,
    getCategorieById,
    deleteCategorie
}