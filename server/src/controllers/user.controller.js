const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Profil = require('../models/Profil.model')

const addUser = async (req, res) => {
    const {nom, prenom, email, telephone, password, profilId} = req.body
    try {
        const tour = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, tour)

        const rep = await User.create({
            nom,
            prenom,
            email,
            telephone,
            password: hashedPassword,
            profilId
        })
        const msg = 'Utilisateur créé avec succès'
        return res.status(201).json({message: msg, data: rep})

    } catch (error) {
        const msg = 'Echec lors de l\'enregistrement'
        return res.status(500).json({message: msg, erreur: error})
    }
}

const getUsers = async (req, res) => {
    try {
        const rep = await User.find()
        const msg = 'Utilisateurs récupérés avec succès'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la récupération des données'
        return res.status(500).json({message: msg, erreur: error})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({message: 'Email ou mot de passe incorrect'})
        } else {
            if(!user.etat) {
                return res.status(403).json({message: "Votre compte est désactivé!"})
            } else {
                const verifiedPassword = await bcrypt.compare(password, user.password)
                if(!verifiedPassword) {
                    return res.status(404).json({message: 'Email ou mot de passe incorrect'})
                } else {
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: email,
                            userProfil: user.profilId
                        },
                        process.env.SECRET_KEY, {expiresIn: '4h'}
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

const getUserDetails = async (req, res) => {
    const { id } = req.params
    try {

        const user = await User.findById(id)
        const profil = await Profil.findById(user.profilId)
        const msg = 'Utilisateur récupéré avec succès'

        return res.status(200).json({message: msg, data: {user, profil}})
    } catch (error) {
        const msg = 'Erreur lors de la récupération de l\'utilisateur'
        return res.status(500).json({message: msg, erreur: error})
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const rep = await User.findByIdAndDelete(id)
        const msg = 'Utilisateur supprimé avec succès'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la suppréssion'
        return res.status(500).json({message: msg, erreur: error})
    }
}

const updatePassword = async (req, res) => {
    const {userId} =  req.userData
    const {password} = req.body
    try {

        const tour = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, tour)
        const rep = await User.updateOne({ _id: userId }, { $set: { password: hashedPassword } })
        const msg = 'Mot de passe modifié avec succès'
        return res.status(200).json({message: msg, data: rep})

    } catch (error) {

        const msg = 'Erreur lors de la modification du mot de passe'
        return res.status(500).json({message: msg, erreur: error})

    }    
}

const toggleUserState = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        user.etat = !user.etat

        const rep = await user.save()
        const msg = `Utilisateur ${ rep.etat ? 'débloqué' : 'bloqué'} avec succès`
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Une erreur est survenue'
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    login,
    addUser,
    getUsers,
    getUserDetails,
    deleteUser,
    updatePassword,
    toggleUserState
}