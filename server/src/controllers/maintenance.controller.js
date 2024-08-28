const Maintenance = require('../models/Maintenance.model')

const addMaintenance = async (req, res) => {
    const {type, date, description, statut, voitureId} = req.body

    try {
        const rep = await Maintenance.create({
            type,
            date,
            description,
            statut,
            voitureId
        })

        const msg = "Maintenance enregistrée avec succès"
        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de l'enregistrement"
        return res.status(500).json({message: msg, erreur: error})
    }
}

const getMaintenance = async (req, res) => {
    try {
        const rep = await Maintenance.find()
        const msg = "Maintenances récupérées avec succès"

        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération des données"
        return res.status(500).json({message: msg, erreur: error})
    }
}

const updateMaintenance = async (req, res) => {
    const {id} = req.params
    const {type, date, description, statut, voitureId} = req.body
    try {
        const rep = await Maintenance.findByIdAndUpdate(id, {
            type, date, description, statut, voitureId
        }, {new: true})
        const msg = "Maintenance modifiée avec succès"
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la modification des données"
        return res.status(500).json({message: msg, erreur: error})
    }
}

const deleteMaintenance = async (req, res) => {
    const {id} = req.params
    try {
        const rep = await Maintenance.findByIdAndDelete(id)
        const msg = "Maintenance supprimée avec succès"

        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la suppression"
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    addMaintenance,
    getMaintenance,
    updateMaintenance,
    deleteMaintenance
}