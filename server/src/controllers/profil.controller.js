const Droit = require('../models/Droit.model')
const Profil = require('../models/Profil.model')
const ProfilDroit = require('../models/ProfilDroit.model')

const addProfil = async (req, res) => {
    const {nom, droitId} = req.body
    try {
        const rep = await Profil.create({nom: nom})
        droitId.map(async (id) => {
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

const updateProfilDroits = async (req, res, next) => {
    const { id } = req.params
    const {droitId} = req.body

    try {
        const currentProfilDroits = await ProfilDroit.find({profilId: id})
        const currentDroitsIds = currentProfilDroits.map(pd => pd.droitId.toString())

        const updateDroitsIds = droitId.map(d => d.toString())

        const droitsToRemove = currentDroitsIds.filter(id => !updateDroitsIds.includes(id))
        const droitsToAdd = updateDroitsIds.filter(id => !currentDroitsIds.includes(id))

        if(droitsToRemove.length > 0) {
            await ProfilDroit.deleteMany({
                profilId: id,
                droitId: {$in: droitsToRemove}
            })
        }

        if(droitsToAdd.length > 0) {
            const newProfilDroits = droitsToAdd.map(droitId => ({
                profilId: id,
                droitId: droitId
            }))
            const rep = await ProfilDroit.insertMany(newProfilDroits)
            console.log(rep);
        }

        next()

    } catch (error) {
        console.error('Erreur lors de la mise à jour des droits du profil:', error);
        return res.status(500).send('Erreur serveur');
    }
}

const updateProfil = async (req, res) => {
    const { id } = req.params
    const { nom } = req.body

    try {

        const updatedProfil = await Profil.findByIdAndUpdate(id, { nom: nom }, { new: true })
        const msg = 'Profil modifié avec succès'
        return res.status(200).json({message: msg, data: updatedProfil})

    } catch (error) {
        const msg = 'Echec lors de la modification'
        return res.status(500).json({message: msg, erreur: error})
    }
}

const deleteProfil = async (req, res) => {
    const { id } = req.params
    
    try {
        const rep = await Profil.findByIdAndDelete(id)
        const rep1 = await ProfilDroit.deleteMany({profilId: id})
        console.log(rep1);
        const msg = 'Suppression réussie'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la suppression'
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    addProfil,
    getProfils,
    getProfilDetails,
    updateProfilDroits,
    updateProfil,
    deleteProfil
}