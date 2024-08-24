const Modele = require('../models/Modele.model')

const addModele = async (req, res) => {
    const {nom, description, marqueId} = req.body
    try {
        const rep = await Modele.create({nom, description, marqueId})
        const msg = "Modèle Enregistré avec succès."
        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg ="Erreur lors de l'enregistrement"
        return res.status(500).json({message: msg, erreur: error})
    }
}

const getModeles = async (req, res) => {
    try {
        const rep = await Modele.find()
        const msg = "Modèles récupérés avec succès"
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération des données"
        return res.status(500).json({message: msg, erreur: error})
    }
}

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

const deleteModele = async (req, res) => {
    const { id } = req.params
    try {
        const rep = await Modele.findByIdAndDelete(id)
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