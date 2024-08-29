const Favori = require('../models/Favori.model')

const addFavori = async (req, res) => {
    const { id } = req.params
    const {clientId} = req.authData

    try {
        const rep = await Favori.create({clientId, voitureId: id})
        const msg = "Voiture ajoutée aux favoris"
        
        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de l'ajout"
        return res.status(500).json({message: msg, erreur: error})
    }
}


const getFavoris = async (req, res) => {
    const {clientId} = req.authData
    try {
        const rep = await Favori.find({clientId})
        const msg = "Liste des favoris récupérée avec succès."
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération"
        return res.status(500).json({message: msg, erreur: error})
    }
}

const deleteFavori = async (req, res) => {
    const {clientId} = req.authData
    const { id } = req.params
    try {
        const rep = await Favori.deleteOne({clientId, voitureId: id})
        const msg = "La voiture a été supprimé de vos favoris."
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la suppression"
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    addFavori,
    getFavoris,
    deleteFavori
}

