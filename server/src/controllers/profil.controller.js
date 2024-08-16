const Droit = require('../models/Droit.model')
const Profil = require('../models/Profil.model')
const ProfilDroit = require('../models/ProfilDroit.model')

const addProfil = async (req, res) => {
    const {nom, droitId} = req.body
    try {
        const rep = await Profil.create({nom: nom})
        droitId.forEach(async (id) => {
            const rep1 = await ProfilDroit.create({droitId: id, profilId: rep._id})
            console.log(rep1)
        })
        const msg = "Profil enregistré avec succès"
        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg ="Erreur lors de l'enregistrement"
        return res.status(500).json({message: msg, erreur: error})
    }
}

const getProfils = async (req, res) => {
    try {
        const rep = await Profil.find()
        const msg = 'Profils récupérés avec succès'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la récupération des données'
        return res.status(500).json({message: msg, erreur: error})
    }
}

const getProfilDetails = async (req, res) => {
    const { id } = req.params
    try {
        const data = {}
        const rep = await Profil.findById(id)
        data.profil = rep
        const rep1 = await ProfilDroit.find({profilId: rep._id})
        const droitsPromises = rep1.map(async (el) => {
            return await Droit.findById(el.droitId);
        })
        data.droits = await Promise.all(droitsPromises)
        const msg = 'Données récupérées avec succès'
        return res.status(200).json({message: msg, data: data})
    } catch (error) {
        const msg = 'Erreur lors de la récupération des données'
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    addProfil,
    getProfils,
    getProfilDetails
}