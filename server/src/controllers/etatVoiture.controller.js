const EtatVoiture = require('../models/EtatVoiture.model')
const Reservation = require('../models/Reservation.model')

/**
 * Ajoute un nouvel état de voiture.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de l'état de la voiture ajouté.
 */
const addEtatVoiture = async (req, res) => {
    const { 
            peinture, 
            carrosserie, 
            sieges, 
            tableauDeBord, 
            phare, 
            tapisserie, 
            pareBrise, 
            vitres, 
            essuieVitre, 
            pareChocAvant, 
            pareChocArriere, 
            climatisation, 
            toitOuvrant, 
            poignees 
        } = req.body
    const { reservationId } = req.params    
    try {

        if(
            !peinture 
            || !carrosserie 
            || !sieges 
            || !tableauDeBord 
            || !phare 
            || !tapisserie 
            || !pareBrise 
            || !vitres 
            || !essuieVitre
            || !pareChocAvant
            || !pareChocArriere
            || !climatisation
            || !toitOuvrant
            || !poignees
        ) {
            return res.status(400).json({
                message: "Tous les champs sont obligatoires."
            })
        }

        const reservation = await Reservation.findById( reservationId )

        if(!reservation){
            return res.status(400).json({
                message: "Aucune réservation trouvée avec l'identifiant fourni."
            })
        }
        const rep = await EtatVoiture.create({ 
            peinture, 
            carrosserie, 
            sieges, 
            tableauDeBord, 
            phare, 
            tapisserie, 
            pareBrise, 
            vitres, 
            essuieVitre, 
            pareChocAvant, 
            pareChocArriere, 
            climatisation, 
            toitOuvrant, 
            poignees, 
            reservationId 
        })
        return res.status(201).json({ 
            message: "État de la voiture enregistré avec succès.", 
            data: rep 
        })
    } catch (error) {
        console.log("Erreur dans etatVoiture.controller (addEtatVoiture)", error)
        return res.status(500).json({ 
            message: "Erreur lors de l'enregistrement de l'état de la voiture.", 
            erreur: error 
        })
    }
}

/**
 * Récupère l'état de la voiture pour une réservation spécifique.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de l'état de la voiture.
 */
const getEtatVoiture = async (req, res) => {
    const { id } = req.params
    try {
        const rep = await EtatVoiture.find({reservationId: id})
        return res.status(200).json({ 
            message: "État de la voiture récupéré avec succès.", 
            data: rep 
        })
    } catch (error) {
        console.log("Erreur dans etatVoiture.controller (getEtatVoiture)", error)
        return res.status(500).json({ 
            message: "Erreur lors de la récupération des données.",
            erreur: error 
        })
    }
}

/**
 * Met à jour l'état de la voiture.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de l'état de la voiture mis à jour.
 */
const updateEtatVoiture = async (req, res) => {
    const { id } = req.params
    const { 
        peinture,
        carrosserie,
        sieges,
        tableauDeBord,
        phare,
        tapisserie,
        pareBrise,
        vitres,
        essuieVitre,
        pareChocAvant,
        pareChocArriere,
        climatisation,
        toitOuvrant,
        poignees,
    } = req.body
    try {
        const rep = await EtatVoiture.findByIdAndUpdate(id, { 
            peinture,
            carrosserie,
            sieges,
            tableauDeBord,
            phare,
            tapisserie,
            pareBrise,
            vitres,
            essuieVitre,
            pareChocAvant,
            pareChocArriere,
            climatisation,
            toitOuvrant,
            poignees,
        }, { new: true })
        return res.status(200).json({ 
            message: "État de la voiture modifié avec succès.", 
            data: rep 
        })
    } catch (error) {
        console.log("Erreur dans etatVoiture.controller (updateEtatVoiture)", error)
        return res.status(500).json({ 
            message: "Erreur lors de la modification de l'état de la voiture.", 
            erreur: error 
        })
    }
}

/**
 * Supprime l'état de la voiture.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données de l'état de la voiture supprimé.
 */
const deleteEtatVoiture = async (req, res) => {
    const { id } = req.params
    try {
        const rep = await EtatVoiture.findByIdAndDelete(id)
        
        return res.status(200).json({ 
            message: "État de la voiture supprimé avec succès.", 
            data: rep 
        })
    } catch (error) {
        console.log("Erreur dans etatVoiture.controller (deleteEtatVoiture)", error)
        return res.status(500).json({ 
            message: "Erreur lors de la suppression de l'état de la voiture.", 
            erreur: error 
        })
    }
}

module.exports = {
    addEtatVoiture,
    getEtatVoiture,
    updateEtatVoiture,
    deleteEtatVoiture
}
