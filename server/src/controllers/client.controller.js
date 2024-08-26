const Client = require('../models/Client.model')
const bcrycpt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

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

const signIn = async (req, res) => {
    const {email, password} = req.body

    try {
        const client = await Client.findOne({email: email})
        if(!client) {
            return res.status(404).json({message: 'Email ou mot de passe incorrect !'})
        } else {
            if(!client.etat) {
                return res.status(403).json({message: 'Votre compte a été suspendu !'})
            } else {
                const verifiedPassword = await bcrycpt.compare(password, client.password)
                if(!verifiedPassword) {
                    return res.status(404).json({message: 'Email ou mot de passe incorrect !'})
                } else {
                    const secret = fs.readFileSync('./.meow/meowPr.pem')
                    const token = jwt.sign(
                        {
                            clientId: client._id,
                            clientEmail: client.email,
                            clientProfil: client.profil
                        }, 
                        secret, {expiresIn: '4h', algorithm: "RS256"}
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