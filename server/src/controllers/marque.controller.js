const Marque = require('../models/Marque.model')
const Modele = require('../models/Modele.model')
const { deleteLogo } = require('../services')
const mongoose = require('mongoose')

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
        if(!nom || !req.file) {
            return res.status(400).json({
                message: "Veuillez renseigner le nom de la marque et ajouter un logo"
            })
        }
        const rep = await Marque.create({
            nom,
            paysDorigine,
            logo: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        })

        return res.status(201).json({
            message: 'Marque enregistrée avec succès', 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans marque.controller (addMarque)", error)
        return res.status(500).json({
            message: "Erreur lors de l'enregistrement", 
            erreur: error
        })
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

        return res.status(200).json({
            message: msg, 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans marque.controller (getMarques)", error)
        return res.status(500).json({
            message: "Erreur lors de la récupération des données", 
            errerur: error
        })
    }
}

const getMarqueById = async (req, res) => {
    const {id} = req.params
    try {
        const rep = await Marque.findById(id)

        return res.status(200).json({
            message: "Détails de la marque récupérés avec succès", 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans marque.controller (getMarqueById)", error)
        return res.status(500).json({
            message: "Erreur lors de la récupération des données", 
            errerur: error
        })
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
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const marque = await Marque.findByIdAndDelete(id, { session })
        if(!marque) {
            return res.status(400).json({
                message: "Aucune marque trouvée avec l'identifiant fourni."
            })
        }
        const { logo } = marque
        try {
            deleteLogo(logo)
        } catch (error) {
            console.log("Erreur lors de la suppression du logo précédent: ", error.message);
        }
        await Modele.deleteMany({marqueId: marque._id}, { session })

        await session.commitTransaction()

        return res.status(200).json({
            message: 'Marque supprimée avec succès', 
            data: marque
        })
    } catch (error) {
        await session.abortTransaction()
        console.log("Erreur dans marque.controller (deleteMarque)", error)
        return res.status(500).json({
            message: 'Erreur lors de la supprission', 
            erreur: error
        })
    } finally {
        session.endSession()
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
        if(!marque) {
            return res.status(400).json({
                message: "Aucune marque trouvée avec l'identifiant fourni."
            })
        }

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


        return res.status(200).json({
            message: 'Marque modifiée avec succès', 
            data: rep
        })
    } catch (error) {
        console.log("Erreur dans marque.controller (updateMarque)", error)
        return res.status(500).json({
            message: "Erreur lors de la modification", 
            erreur: error
        })
    }
}

const getMarquesWithTheirModeles = async (req, res) => {
    try {
        const marques = await Marque.find().lean()
        const marquesWithModels = await Promise.all(
            marques.map(async (marque) => {
                const modeles = await Modele.find({marqueId: marque._id}).lean()
                return {...marque, modeles}
            })
        )

        res.status(200).json(marquesWithModels)
    } catch (error) {
        console.log("Erreur dans marque.controller (getMarquesWithTheirModeles)", error)
        res.status(500).json({message: 'Erreur lors de la récupération des marques et des modèles'})
    }
}

module.exports = {
    addMarque,
    getMarques,
    getMarqueById,
    updateMarque,
    deleteMarque,
    getMarquesWithTheirModeles
}