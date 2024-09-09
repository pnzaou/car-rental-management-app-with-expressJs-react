const Client = require('../models/Client.model')
const bcrycpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

/**
 * Inscription d'un nouveau client.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données du client créé.
 */
const signUp = async (req, res) => {
    const {nom, prenom, email, password, tel, numeroPermis, expirationPermis} = req.body
    const {photoPermis, photoCNI} = req.files
    try {
        const tour = await bcrycpt.genSalt(10)
        const hashedPassword = await bcrycpt.hash(password, tour)
        const rep = await Client.create({
            nom,
            prenom,
            email,
            password: hashedPassword,
            tel,
            numeroPermis,
            expirationPermis,
            photoPermis: `${req.protocol}://${req.get('host')}/uploads/${photoPermis[0].filename}`,
            photoCNI: `${req.protocol}://${req.get('host')}/uploads/${photoCNI[0].filename}`
        })
        const msg = "Votre compte a été créé avec succès"
        return res.status(201).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la création de votre compte"
        return res.status(500).json({message: msg, erreur: error.message})
    }
}

/**
 * Récupération de tous les clients.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données des clients récupérés.
 */
const getClients = async (req, res) => {
    try {
        const rep = await Client.find()
        const msg = "Clients récupérés avec succès"

        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la récupération"
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Connexion d'un client existant.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et un token JWT si la connexion est réussie.
 */
const signIn = async (req, res) => {
    const {email, password} = req.body

    try {
        const client = await Client.findOne({email: email})
        if(!client) {
            return res.status(401).json({message: 'Email ou mot de passe incorrect !'})
        } else {
            if(!client.etat) {
                return res.status(403).json({message: 'Votre compte a été suspendu !'})
            } else {
                const verifiedPassword = await bcrycpt.compare(password, client.password)
                if(!verifiedPassword) {
                    return res.status(401).json({message: 'Email ou mot de passe incorrect !'})
                } else {
                    const secret = fs.readFileSync('./.meow/meowPr.pem')
                    const token = jwt.sign(
                        {
                            clientId: client._id,
                            clientEmail: client.email,
                            clientNom: client.nom,
                            clientPrenom: client.prenom,
                            clientProfil: client.profil
                        }, 
                        secret, {expiresIn: '1h', algorithm: "RS256"}
                    )
                    const msg = 'Connexion réussie'
                    return res.status(200).json({message: msg, token: token})
                }
            }
        }
    } catch (error) {
        const msg = 'Erreur lors de la connexion'
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Mise à jour des détails du compte d'un client.
 * @async
 * @param {Object} req - L'objet de requête Express, contenant les données du client à mettre à jour.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message et les données mises à jour du client.
 */
const updateAcountDetails = async (req, res) => {
    const {clientId} = req.authData
    const {nom, prenom, email, tel, numeroPermis, expirationPermis} = req.body
    try {
        const rep = await Client.findByIdAndUpdate(clientId, {
            nom,
            prenom,
            email,
            tel,
            numeroPermis,
            expirationPermis
        }, {new: true})
        const msg = "Votre compte a été mis à jour avec succès."
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = "Erreur lors de la mise à jour"
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Modification du mot de passe du client.
 * @async
 * @param {Object} req - L'objet de requête Express, contenant l'ancien et le nouveau mot de passe.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message de succès ou d'erreur.
 */
const changePassword = async (req, res) => {
    const {clientId} = req.authData
    const {oldPassword, newPassword} = req.body
    try {
        const client = await Client.findById(clientId)
        const veriviedPassword = await bcrycpt.compare(oldPassword, client.password)
        if(!veriviedPassword){
            return res.status(404).json({message: "L'ancien mot de passe que vous avez saisi est incorrect !"})
        } else {
            const tour = await bcrycpt.genSalt(10)
            const hashedPassword = await bcrycpt.hash(newPassword, tour)
            client.password = hashedPassword

            const rep = await client.save()
            const msg = "Votre mot de passe a été modifié avec succès"

            return res.status(200).json({message: msg, data: rep})
        }
    } catch (error) {
        const msg = "Erreur lors de la modification du mot de passe"
        return res.status(500).json({message: msg, erreur: error})
    }
}



module.exports = {
    signUp,
    getClients,
    signIn,
    updateAcountDetails,
    changePassword
}