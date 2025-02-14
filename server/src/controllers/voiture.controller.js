const Voiture = require('../models/Voiture.model')
const Categorie = require('../models/Categorie.model')
const Marque = require('../models/Marque.model')
const Modele = require('../models/Modele.model')
const VUT = require('../models/voitureUniteTarification.model')
const UT = require('../models/uniteTarification.model')
const VOL = require('../models/voitureOptionLocation.model')
const OL = require('../models/optionLocation.model')
const { deleteLogo } = require('../services')

/**
 * Ajoute une nouvelle voiture avec ses options et tarifs de location.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {string} req.body.immatriculation - L'immatriculation de la voiture.
 * @param {Date} req.body.DateMiseCirculation - La date de mise en circulation de la voiture.
 * @param {string} req.body.typeCarburant - Le type de carburant de la voiture.
 * @param {number} req.body.capaciteDassise - La capacité d'assise de la voiture.
 * @param {string} req.body.categorieId - L'identifiant de la catégorie de la voiture.
 * @param {string} req.body.modeleId - L'identifiant du modèle de la voiture.
 * @param {Array} req.body.selectedOptions - Les options sélectionnées pour la voiture.
 * @param {string} req.body.uniteTarificationId - L'identifiant de l'unité de tarification.
 * @param {number} req.body.tarifLocation - Le tarif de location de la voiture.
 * @param {Array} req.files - Les images de la voiture.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message de succès ou d'erreur.
 */
const addVoiture = async (req, res) => {
    const { 
        immatriculation, 
        DateMiseCirculation,
        typeBoite, 
        typeCarburant, 
        capaciteDassise,
        quantite,
        prix, 
        categorieId, 
        modeleId,
        selectedOptions,
        uniteTarificationId,
        tarifLocation
    } = req.body
    let rep

    const images = req.files.map(image => `${req.protocol}://${req.get('host')}/uploads/${image.filename}`)
    try {
        if(!req.files || !typeBoite || !typeCarburant || !capaciteDassise){
            return res.status(400).json({
                message: "Veuillez renseigner les champs obligatoires."
            })
        } 

        const voiture = await Voiture.create({
            immatriculation,
            images,
            DateMiseCirculation,
            typeBoite,
            typeCarburant,
            capaciteDassise,
            quantite,
            prix,
            categorieId,
            modeleId
        })

        if(uniteTarificationId) {
            await VUT.create({uniteTarificationId, voitureId: voiture._id, tarifLocation})
        }

        if(selectedOptions) {
            const optionPromises = JSON.parse(selectedOptions).map(option => {
                return VOL.create({
                    tarifOption: option.tarifOption,
                    voitureId: voiture._id,
                    optionLocationId: option.optionLocationId
                })
            })
    
            await Promise.all(optionPromises)
        }

        return res.status(201).json({
            message: "Voiture enregistrée avec succès", 
            data: voiture
        })
    } catch (error) {
        console.log("Erreur dans user.controller (addVoiture)", error)
        return res.status(500).json({
            message: "Erreur lors de l'enregistrement", 
            erreur: error
        })
    }   
}

/**
 * Récupère toutes les voitures.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec la liste des voitures récupérées.
 */
const getVoitues = async (req, res) => {
    try {
        const rep = await Voiture.find().lean()
        const voitureWithModeleAndLocPrice = await Promise.all(rep.map(async (voiture) => {
            const {nom} = await Modele.findById(voiture.modeleId, {nom: 1})
            const [tarifLocation] = await VUT.find({voitureId: voiture._id}, {tarifLocation: 1})
            return {...voiture, modele: nom, prixLocation: tarifLocation.tarifLocation}
        }))
        const msg = 'Voitures récupérés avec succès'
        return res.status(200).json({message: msg, data: voitureWithModeleAndLocPrice})
    } catch (error) {
        console.log("Erreur dans user.controller (getAuthUserDetails)", error)
        const msg = 'Erreur lors de la récupération des données'
        return res.status(500).json({message: msg, erreur: error})
    }
}


const updateVoiture = async (req, res) => {
    const { id } = req.params
    const { 
        immatriculation, 
        DateMiseCirculation,
        typeBoite, 
        typeCarburant, 
        capaciteDassise, 
        categorieId, 
        modeleId,
        tarifLocation
    } = req.body
    
    try {

        const updateData = {
            immatriculation, 
            DateMiseCirculation, 
            typeBoite,
            typeCarburant, 
            capaciteDassise, 
            categorieId, 
            modeleId 
        }

        if(req.files) {
            const images = req.files.map(image => `${req.protocol}://${req.get('host')}/uploads/${image.filename}`)
            updateData.images = images
        }

        const rep = await Voiture.findByIdAndUpdate(id, updateData, {new: true})

        await VUT.updateOne({voitureId: id}, {$set: {tarifLocation}})

        const selectedOptions = JSON.parse(req.body.selectedOptions)
        const existingOptions = await VOL.find({voitureId: id})

        const optionsToRemove = existingOptions.filter(opt => 
            !selectedOptions.some(selected => selected.optionLocationId === String(opt.optionLocationId))
        )

        const removePromises = optionsToRemove.map(option => 
            VOL.findByIdAndDelete(option._id)
        )

        await Promise.all(removePromises)

        const addOrUpdatePromises = selectedOptions.map(option => {
            return VOL.findOneAndUpdate(
                {voitureId: id, optionLocationId: option.optionLocationId},
                {tarifOption: option.tarifOption},
                {upsert: true, new: true}
            )
        })

        await Promise.all(addOrUpdatePromises)

        const msg = "Voiture modifiée avec succès"
        return res.status(200).json({message: msg, data: rep})

    } catch (error) {
        console.log("Erreur dans user.controller (getAuthUserDetails)", error)
        const msg = "Erreur lors de la modification"
        return res.status(500).json({message: msg, erreur: error})

    }
}

const deleteVoiture = async (req, res) => {
    const { id } = req.params
    try {
        const rep = await Voiture.findByIdAndDelete(id)
        const {images} = rep
        images.map(image => {
            try {
                deleteLogo(image)
            } catch (error) {
                console.log("Erreur lors de la suppression des anciennes images: ", error.message)
            }
        })
        const msg = "Voiture supprimée avec succès"
        return res.status(200).json({message: msg, data: rep})
        
    } catch (error) {
        console.log("Erreur dans user.controller (getAuthUserDetails)", error)
        const msg = 'Erreur lors de la supprission'
        return res.status(500).json({message: msg, erreur: error}) 
    }
}

const getRentVoitues = async (req, res) => {
    try {
        const rep = await Voiture.find({ quantite: { $eq: null }, prix: { $eq: null } }).lean()
        const voitureWithModeleAndLocPrice = await Promise.all(rep.map(async (voiture) => {
            const {nom} = await Modele.findById(voiture.modeleId, {nom: 1})
            const [tarifLocation] = await VUT.find({voitureId: voiture._id}, {tarifLocation: 1})
            return {...voiture, modele: nom, prixLocation: tarifLocation.tarifLocation}
        }))
        const msg = 'Voitures récupérés avec succès'
        return res.status(200).json({message: msg, data: voitureWithModeleAndLocPrice})
    } catch (error) {
        console.log("Erreur dans user.controller (getRentVoitues)", error)
        const msg = 'Erreur lors de la récupération des données'
        return res.status(500).json({message: msg, erreur: error})
    }
}

const getSaleVoitues = async (req, res) => {
    try {
        const rep = await Voiture.find({ quantite: { $gt: 0 }, prix: { $ne: null } }).lean()
        const voitureWithModeleAndLocPrice = await Promise.all(rep.map(async (voiture) => {
            const {nom} = await Modele.findById(voiture.modeleId, {nom: 1})
            const [tarifLocation] = await VUT.find({voitureId: voiture._id}, {tarifLocation: 1})
            return {...voiture, modele: nom, prixLocation: tarifLocation.tarifLocation}
        }))
        const msg = 'Voitures récupérés avec succès'
        return res.status(200).json({message: msg, data: voitureWithModeleAndLocPrice})
    } catch (error) {
        console.log("Erreur dans user.controller (getSaleVoitues)", error)
        const msg = 'Erreur lors de la récupération des données'
        return res.status(500).json({message: msg, erreur: error})
    }
}

const getVoituresDetailsForClient = async (req, res) => {
    const {id} = req.params
    try {
        const voiture = await Voiture.findById(id, {immatriculation: 0}).lean()
        const categorie = await Categorie.findById(voiture.categorieId, {nom: 1, description: 1})
        const modele = await Modele.findById(voiture.modeleId, {nom: 1, marqueId:1})
        const marque = await Marque.findById(modele.marqueId, {logo: 1, nom: 1, paysDorigine: 1})
        const tarif = await VUT.find({voitureId: voiture._id}).lean()
        const unites = await Promise.all(tarif.map(async (t) => {
            return await UT.findById(t.uniteTarificationId, {nom: 1})
        }))
        const tarifOp = await VOL.find({voitureId: voiture._id}, {tarifOption: 1, optionLocationId: 1}).lean()
        const options = await Promise.all(tarifOp.map(async (TO) => {
            return await OL.findById(TO.optionLocationId, {nom: 1})
        }))

        const msg = "Données récupérées avec succès"
        return res.status(200).json({message: msg, data: {...voiture, categorie, marque, modele, tarif, unites, tarifOp, options}})
        
    } catch (error) {
        console.log("Erreur dans user.controller (getAuthUserDetails)", error)
        const msg = "Erreur lors de récupération des données"
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    addVoiture,
    getVoitues,
    updateVoiture,
    deleteVoiture,
    getRentVoitues,
    getSaleVoitues,
    getVoituresDetailsForClient
} 