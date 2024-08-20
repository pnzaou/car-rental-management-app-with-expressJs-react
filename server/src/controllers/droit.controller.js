const Droit = require('../models/Droit.model')


const addDroit = async (req, res) => {
    const { autorisation } = req.body
    try {
        const rep = await Droit.create({autorisation})
        const msg = 'Droit enregistré avec succès'
        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de l\'enregistrement'
        return res.status(500).json({message: "Erreur lors de l\'enregistrement", erreur: error})
    }
}

const getDroits = async (req, res) => {
    try {
        const rep = await Droit.find()
        const msg = 'Droits recupérés avec succès.'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la récupération des données'
        return res.status(500).json({message: msg, erreur: error})
    }
}

const updateDroit = async (req, res) => {
    const {autorisation } = req.body
    const id = req.params.id
    try {
        const rep = await Droit.findByIdAndUpdate(id, {autorisation}, {new: true})
        const msg = 'Modification réussie'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la modification'
        return res.status(500).json({message: msg, erreur: error})
    }

}

const deleteDroit = async (req, res) => {
    const id = req.params.id
    try {
        const rep = await Droit.findByIdAndDelete(id)
        const msg = 'Suppression réussie'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la supression'
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    addDroit,
    getDroits,
    updateDroit,
    deleteDroit
}