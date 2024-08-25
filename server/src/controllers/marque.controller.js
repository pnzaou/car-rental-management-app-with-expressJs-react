const Marque = require('../models/Marque.model')
const { deleteLogo } = require('../services')



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

const getMarques = async (req, res) => {
    try {
        const rep = await Marque.find()
        const msg = "Marques récupérées avec succès"
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération des données"
        return res.status(500).json({message: msg, errerur: error})
    }
}

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
        const msg = 'Marque supprimée avec succès'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la supprission'
        return res.status(500).json({message: msg, erreur: error})
    }
}

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

module.exports = {
    addMarque,
    getMarques,
    updateMarque,
    deleteMarque
}