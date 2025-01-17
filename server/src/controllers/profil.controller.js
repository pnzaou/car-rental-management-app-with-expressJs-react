const Droit = require('../models/Droit.model')
const Profil = require('../models/Profil.model')
const ProfilDroit = require('../models/ProfilDroit.model')
const User = require('../models/User.model')
const mongoose = require('mongoose')

/**
 * Ajoute un nouveau profil et assigne des droits à ce profil.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message de succès ou d'erreur.
 */
const addProfil = async (req, res) => {
    const {nom, droitId} = req.body
    try {
        if(!nom || droitId.length === 0 || !droitId) {
            return res.status(400).json({message: "Veuillez préciser le nom du profil et lui assigner des droits au profil"})
        } else {
            const rep = await Profil.create({nom: nom})
            droitId.map(async (id) => {
                const rep1 = await ProfilDroit.create({droitId: id, profilId: rep._id})
                console.log(rep1)
            })

            return res.status(201).json({
                message: "Profil enregistré avec succès", 
                data: rep
            })
        }
    } catch (error) {
        console.log("Erreur dans profil.controller (addProfil)", error)
        return res.status(500).json({
            message: "Erreur lors de l'enregistrement", 
            erreur: error
        })
    }
}

/**
 * Récupère tous les profils.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec la liste des profils récupérés.
 */
const getProfils = async (req, res) => {
    try {
        const rep = await Profil.find()
        const msg = rep.length === 0 ? "Aucun profil enregistré veuillez en ajouter" 
        : "Profils récupérés avec succès"

        return res.status(200).json({
            message: msg, 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans profil.controller (getProfils)", error)
        return res.status(500).json({
            message: 'Erreur lors de la récupération des données', 
            erreur: error
        })
    }
}

/**
 * Récupère les détails d'un profil spécifique, y compris les droits associés.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {string} req.params.id - L'identifiant du profil à récupérer.
 * @returns {Promise<void>} Renvoie une réponse JSON avec les détails du profil et ses droits.
 */
const getProfilDetails = async (req, res) => {
    const { id } = req.params
    try {
        const data = {}
        const rep = await Profil.findById(id)
        if(!rep) {
            res.status(400).json({
                message: "Aucun profil trouvé avec l'identifiant fourni."
            })
        }
        data.profil = rep

        const rep1 = await ProfilDroit.find({profilId: rep._id})
        const droitsPromises = rep1.map(async (el) => {
            return await Droit.findById(el.droitId);
        })
        data.droits = await Promise.all(droitsPromises)
        
        return res.status(200).json({
            message: 'Données récupérées avec succès',
            data: data
        })
    } catch (error) {
        console.log("Erreur dans profil.controller (getProfilDetails)", error)
        return res.status(500).json({
            message: 'Erreur lors de la récupération des données',
            erreur: error
        })
    }
}

const getProfil = async (req, res) => {
    const {id} = req.params
    try {
        const rep = await Profil.findById(id, {_id: 0, nom: 1})

        return res.status(200).json({
            message: "nom du profil récupéré avec succès", 
            data: rep
        })

    } catch (error) {
        console.log("Erreur dans profil.controller (getProfil)", error)
        return res.status(500).json({
            message: 'Erreur lors de la récupération des données',
            erreur: error
        })
    }
}

/**
 * Met à jour les droits associés à un profil.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {Function} next - La fonction middleware suivante.
 * @param {string} req.params.id - L'identifiant du profil à mettre à jour.
 * @param {Array<string>} req.body.droitId - Liste des identifiants de droits à associer au profil.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message de succès ou d'erreur.
 */
const updateProfilDroits = async (req, res, next) => {
    const { id } = req.params
    const {droitId} = req.body

    try {
        if(droitId.length === 0 || !droitId) {
            return res.status(400).json({
                message: "Veuillez selectionner un ou des droits à attribuer."
            })
        }
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
        console.log("Erreur dans profil.controller (deleteOption)", error)
        return res.status(500).send('Erreur serveur');
    }
}

/**
 * Met à jour les informations d'un profil.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {string} req.params.id - L'identifiant du profil à mettre à jour.
 * @param {string} req.body.nom - Le nouveau nom du profil.
 * @returns {Promise<void>} Renvoie une réponse JSON avec le profil mis à jour ou un message d'erreur.
 */
const updateProfil = async (req, res) => {
    const { id } = req.params
    const { nom } = req.body

    try {

        const updatedProfil = await Profil.findByIdAndUpdate(id, { nom: nom }, { new: true })

        return res.status(200).json({
            message: 'Profil modifié avec succès', 
            data: updatedProfil
        })

    } catch (error) {
        console.log("Erreur dans profil.controller (updateProfil)", error)
        return res.status(500).json({
            message: 'Echec lors de la modification', 
            erreur: error
        })
    }
}

/**
 * Supprime un profil et tous les droits associés à ce profil.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {string} req.params.id - L'identifiant du profil à supprimer.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message de succès ou d'erreur.
 */
const deleteProfil = async (req, res) => {
    const { id } = req.params
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
        const rep = await Profil.findByIdAndDelete(id, { session })
        if (!rep) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Aucun profil trouvé avec l'identifiant fourni." });
        }

        await ProfilDroit.deleteMany({ profilId: id }, { session })
        await User.updateMany({profilId: id}, {$set: {profilId: null, etat: false}}, { session })

        await session.commitTransaction()

        return res.status(200).json({
            message: 'Suppression réussie',
            data: rep
        })
    } catch (error) {
        await session.abortTransaction()
        console.log("Erreur dans profil.controller (deleteProfil)", error)
        return res.status(500).json({
            message: 'Erreur lors de la suppression', 
            erreur: error
        })
    } finally {
        session.endSession()
    }
}

module.exports = {
    addProfil,
    getProfils,
    getProfilDetails,
    updateProfilDroits,
    updateProfil,
    deleteProfil,
    getProfil
}