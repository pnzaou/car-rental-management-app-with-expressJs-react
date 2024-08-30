const Voiture = require('../models/Voiture.model')
const VUT = require('../models/voitureUniteTarification.model')
const VOL = require('../models/voitureOptionLocation.model')
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
        typeCarburant, 
        capaciteDassise, 
        categorieId, 
        modeleId,
        selectedOptions,
        uniteTarificationId,
        tarifLocation
    } = req.body

    const images = req.files.map(image => `${req.protocol}://${req.get('host')}/uploads/${image.filename}`)
    try {
        const voiture = await Voiture.create({
            immatriculation,
            images,
            DateMiseCirculation,
            typeCarburant,
            capaciteDassise,
            categorieId,
            modeleId
        })

        const rep1 = await VUT.create({uniteTarificationId, tarifLocation})

        const optionPromises = JSON.parse(selectedOptions).map(option => {
            return VOL.create({
                tarifOption: option.tarifOption,
                voitureId: voiture._id,
                optionLocationId: option.optionLocationId
            })
        })

        const rep2 = await Promise.all(optionPromises)
        
        console.log(rep1, rep2);

        const msg = "Voiture enregistrée avec succès"
        return res.status(201).json({message: msg, data: voiture})
    } catch (error) {
        const msg ="Erreur lors de l'enregistrement"
        return res.status(500).json({message: msg, erreur: error})
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
        const rep = await Voiture.find()
        const msg = 'Voitures récupérés avec succès'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la récupération des données'
        return res.status(500).json({message: msg, erreur: error})
    }
}


const updateVoiture = async (req, res) => {
    const { id } = req.params
    const { 
        immatriculation, 
        DateMiseCirculation, 
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
        const msg = 'Erreur lors de la supprission'
        return res.status(500).json({message: msg, erreur: error}) 
    }
}

module.exports = {
    addVoiture,
    getVoitues,
    updateVoiture,
    deleteVoiture
} 