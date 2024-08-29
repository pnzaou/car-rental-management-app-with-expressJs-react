const EtatVoiture = require('../models/EtatVoiture.model')

const addEtatVoiture = async (req, res) => {
    const { 
            peinture, 
            carrosserie, 
            sieges, 
            tableauDeBord, 
            phare, 
            tapisserie, 
            pareBrise, 
            vitres, 
            essuieVitre, 
            pareChocAvant, 
            pareChocArriere, 
            climatisation, 
            toitOuvrant, 
            poignees, 
            reservationId 
        } = req.body
    try {
        const rep = await EtatVoiture.create({ 
            peinture, 
            carrosserie, 
            sieges, 
            tableauDeBord, 
            phare, 
            tapisserie, 
            pareBrise, 
            vitres, 
            essuieVitre, 
            pareChocAvant, 
            pareChocArriere, 
            climatisation, 
            toitOuvrant, 
            poignees, 
            reservationId 
        })
        const msg = "État de la voiture enregistré avec succès."
        return res.status(201).json({ message: msg, data: rep })
    } catch (error) {
        const msg = "Erreur lors de l'enregistrement de l'état de la voiture."
        return res.status(500).json({ message: msg, erreur: error })
    }
}

const getEtatVoiture = async (req, res) => {
    const { id } = req.params
    try {
        const rep = await EtatVoiture.find({reservationId: id})
        const msg = "État de la voiture récupéré avec succès."
        return res.status(200).json({ message: msg, data: rep })
    } catch (error) {
        const msg = "Erreur lors de la récupération des données."
        return res.status(500).json({ message: msg, erreur: error })
    }
}

const updateEtatVoiture = async (req, res) => {
    const { id } = req.params
    const { 
        peinture,
        carrosserie,
        sieges,
        tableauDeBord,
        phare,
        tapisserie,
        pareBrise,
        vitres,
        essuieVitre,
        pareChocAvant,
        pareChocArriere,
        climatisation,
        toitOuvrant,
        poignees,
    } = req.body
    try {
        const rep = await EtatVoiture.findByIdAndUpdate(id, { 
            peinture,
            carrosserie,
            sieges,
            tableauDeBord,
            phare,
            tapisserie,
            pareBrise,
            vitres,
            essuieVitre,
            pareChocAvant,
            pareChocArriere,
            climatisation,
            toitOuvrant,
            poignees,
        }, { new: true })
        const msg = "État de la voiture modifié avec succès."
        return res.status(200).json({ message: msg, data: rep })
    } catch (error) {
        const msg = "Erreur lors de la modification de l'état de la voiture."
        return res.status(500).json({ message: msg, erreur: error })
    }
}

const deleteEtatVoiture = async (req, res) => {
    const { id } = req.params
    try {
        const rep = await EtatVoiture.findByIdAndDelete(id)
        const msg = "État de la voiture supprimé avec succès."
        return res.status(200).json({ message: msg, data: rep })
    } catch (error) {
        const msg = "Erreur lors de la suppression de l'état de la voiture."
        return res.status(500).json({ message: msg, erreur: error })
    }
}

module.exports = {
    addEtatVoiture,
    getEtatVoitures,
    updateEtatVoiture,
    deleteEtatVoiture
}
