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

module.exports = {
    addProfil
}