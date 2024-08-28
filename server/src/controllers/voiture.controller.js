const Voiture = require('../models/Voiture.model')
const VUT = require('../models/voitureUniteTarification.model')
const VOL = require('../models/voitureOptionLocation.model')
const { deleteLogo } = require('../services')

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
        modeleId 
    } = req.body
    
    try {
        const voiture = await Voiture.findById(id)
        const {images} = voiture

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

        const rep = await Voiture.updateOne({_id: id}, {$set: updateData})

        if(req.files && rep.modifiedCount > 0) {
            images.map(image => {
                try {
                    deleteLogo(image)
                } catch (error) {
                    console.log("Erreur lors de la suppression des anciennes images: ", error.message)
                }
            })
        }

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