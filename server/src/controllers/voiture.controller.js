const Voiture = require('../models/Voiture.model')

const addVoiture = async (req, res) => {
    const { 
        immatriculation, 
        DateMiseCirculation, 
        typeCarburant, 
        capaciteDassise, 
        categorieId, 
        modeleId 
    } = req.body

    const images = req.files.map(image => `${req.protocol}://${req.get('host')}/uploads/${image.filename}`)
    try {
        const rep = await Voiture.create({
            immatriculation,
            images,
            DateMiseCirculation,
            typeCarburant,
            capaciteDassise,
            categorieId,
            modeleId
        })
        const msg = "Voiture enregistrée avec succès"
        return res.status(201).json({message: msg, data: rep})
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

module.exports = {
    addVoiture,
    getVoitues
} 