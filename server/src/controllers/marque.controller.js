const Marque = require('../models/Marque.model')
const Modele = require('../models/Modele.model')
const { deleteLogo } = require('../services')

/**
 * Ajoute une nouvelle marque avec un logo.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la marque ajoutée.
 */
const addMarque = async (req, res) => {
    const {nom, paysDorigine} = req.body
    try {
        const rep = await Marque.create({
            nom,
            paysDorigine,
            logo: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        })
        const msg = 'Marque enregistrée avec succès'
        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de l'enregistrement"
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Récupère toutes les marques enregistrées.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données des marques.
 */
const getMarques = async (req, res) => {
    try {
        const rep = await Marque.find()
        const msg = rep.length === 0 ? "Aucune marque enregistrée veuillez en ajouter" 
        : "Marques récupérées avec succès"
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération des données"
        return res.status(500).json({message: msg, errerur: error})
    }
}

const getMarqueById = async (req, res) => {
    const {id} = req.params
    try {
        const rep = await Marque.findById(id)
        const msg = "Détails de la marque récupérés avec succès"
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération des données"
        return res.status(500).json({message: msg, errerur: error})
    }
}

/**
 * Supprime une marque par son identifiant, et supprime également le logo associé.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la marque supprimée.
 */
const deleteMarque = async (req, res) => {
    const { id } = req.params
    try {
        const rep = await Marque.findByIdAndDelete(id)
        const { logo } = rep
        try {
            deleteLogo(logo)
        } catch (error) {
            console.log("Erreur lors de la suppression du logo précédent: ", error.message);
        }
        const rep1 = await Modele.deleteMany({marqueId: rep._id})
        const msg = 'Marque supprimée avec succès'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la supprission'
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Met à jour les informations d'une marque existante, y compris son logo si un nouveau fichier est fourni.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de la marque mise à jour.
 */
const updateMarque = async (req, res) => {
    const { id } = req.params
    const { nom, paysDorigine } = req.body
    
    try {
        const marque = await Marque.findById(id)
        const { logo } = marque

        const updateData = {
            nom,
            paysDorigine
        }

        if(req.file) {
            updateData.logo = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        }

        const rep = await Marque.updateOne({_id: id}, {$set: updateData})

        if(req.file && rep.modifiedCount > 0) {
            try {
                deleteLogo(logo)
            } catch (error) {
                console.log("Erreur lors de la suppression du logo précédent: ", error.message);
            }
        }

        const msg = 'Marque modifiée avec succès';
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la modification"
        return res.status(500).json({message: msg, erreur: error})
    }
}

const getMarquesWithTheirModeles = async (req, res) => {
    try {
        const marques = await Marque.find().lean()
        const marquesWithModels = await Promise.all(marques.map(async (marque) => {
            const modeles = await Modele.find({marqueId: marque._id}).lean()
        }))

        res.status(200).json(marquesWithModels)
    } catch (error) {
        res.status(500).json({message: 'Erreur lors de la récupération des marques et des modèles'})
    }
}

module.exports = {
    addMarque,
    getMarques,
    getMarqueById,
    updateMarque,
    deleteMarque
}