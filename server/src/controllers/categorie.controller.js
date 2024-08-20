const Categorie = require('../models/Categorie.model')

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

const getCategories = async (req, res) => {
    try {
        const rep = await Categorie.find()
        const msg = "Catégories récupérés avec succès."
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération"
        return res.status(500).json({message: msg, erreur: error})
    }
}

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
    deleteCategorie
}