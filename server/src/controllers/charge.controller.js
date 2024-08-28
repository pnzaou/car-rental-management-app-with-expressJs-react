const Charge = require('../models/Charge.model')

const addCharge = async (req, res) => {
    const {type, montant, voitureId} = req.body

    try {
        const rep = await Charge.create({type, montant, voitureId})
        const msg = "Charge enregistrée avec succès"

        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de l'enregistrement"
        return res.status(500).json({message: msg, erreur: error})
    }
}

const getCharges = async (req, res) => {
    try {
        const rep = await Charge.find()
        const msg = "Charges récupérées avec succès"

        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération des données"
        return res.status(500).json({message: msg, erreur: error})
    }
}

const updateCharge = async (req, res) => {
    const {id} = req.params
    const {type, montant, voitureId} = req.body
    try {
        const rep = await Charge.findByIdAndUpdate(id, {
            type, montant, voitureId}, {new: true})
        const msg = "Charge modifiée avec succès"
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la modification des données"
        return res.status(500).json({message: msg, erreur: error})
    }
}

const deleteCharge = async (req, res) => {
    const {id} = req.params
    try {
        const rep = await Charge.findByIdAndDelete(id)
        const msg = "Charge supprimée avec succès"

        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la suppression"
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    addCharge,
    getCharges,
    updateCharge,
    deleteCharge
}