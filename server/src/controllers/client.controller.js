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
                const verifyedPassword = await bcrycpt.compare(password, client.password)
                if(!verifyedPassword) {
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


module.exports = {
    signUp,
    signIn
}