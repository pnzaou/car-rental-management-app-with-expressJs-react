const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const Profil = require('../models/Profil.model')
const fs = require('fs')
const { sendConfirmationEmail, transporter } = require('../services')

/**
 * Crée un nouvel utilisateur avec un mot de passe haché.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {string} req.body.nom - Le nom de l'utilisateur.
 * @param {string} req.body.prenom - Le prénom de l'utilisateur.
 * @param {string} req.body.email - L'email de l'utilisateur.
 * @param {string} req.body.telephone - Le numéro de téléphone de l'utilisateur.
 * @param {string} req.body.password - Le mot de passe de l'utilisateur.
 * @param {string} req.body.profilId - L'identifiant du profil de l'utilisateur.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message de succès ou d'erreur.
 */
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

/**
 * Récupère tous les utilisateurs.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse JSON avec la liste des utilisateurs récupérés.
 */
const getUsers = async (req, res) => {
    const {userId} = req.authData
    try {
        const rep = await User.find({_id: {$ne: userId}})
        const msg = 'Utilisateurs récupérés avec succès'
        return res.status(200).json({message: msg, data: rep})
    } catch (error) {
        const msg = 'Erreur lors de la récupération des données'
        return res.status(500).json({message: msg, erreur: error})
    }
}

/**
 * Connecte un utilisateur en vérifiant son email et mot de passe.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {string} req.body.email - L'email de l'utilisateur.
 * @param {string} req.body.password - Le mot de passe de l'utilisateur.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message de succès et un token JWT ou un message d'erreur.
 */
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).json({message: 'Email ou mot de passe incorrect'})
        } else {
            if(!user.etat) {
                return res.status(403).json({message: "Votre compte est désactivé!"})
            } else {
                const verifiedPassword = await bcrypt.compare(password, user.password)
                if(!verifiedPassword) {
                    return res.status(401).json({message: 'Email ou mot de passe incorrect'})
                } else {
                    const profil = await Profil.findById(user.profilId)
                    const secret = fs.readFileSync('./.meow/meowPr.pem')
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: email,
                            userNom: user.nom,
                            userPrenom: user.prenom,
                            userProfil: profil.nom,
                            profilId: user.profilId
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

/**
 * Récupère les détails d'un utilisateur spécifique.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {string} req.params.id - L'identifiant de l'utilisateur à récupérer.
 * @returns {Promise<void>} Renvoie une réponse JSON avec les détails de l'utilisateur récupéré.
 */
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

/**
 * Supprime un utilisateur spécifique.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {string} req.params.id - L'identifiant de l'utilisateur à supprimer.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message de succès ou d'erreur.
 */
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

/**
 * Met à jour le mot de passe d'un utilisateur.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {string} req.authData.userId - L'identifiant de l'utilisateur dont le mot de passe est mis à jour.
 * @param {string} req.body.oldPassword - L'ancien mot de passe de l'utilisateur.
 * @param {string} req.body.newPassword - Le nouveau mot de passe de l'utilisateur.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message de succès ou d'erreur.
 */
const requestPasswordChange = async (req, res) => {
    const {userId} =  req.authData
    const {oldPassword, newPassword} = req.body

    try {
        const user = await User.findById(userId)
        const verifPassword = await bcrypt.compare(oldPassword, user.password)
        if(!verifPassword){
            return res.status(401).json({message: "Ancien mot de passe incorrect"})
        } else {

            const secret = fs.readFileSync('./.meow/meowPr.pem')
            const token = jwt.sign({userId: user._id, newPassword}, secret, {expiresIn: '1h', algorithm: "RS256"})
            const confirmationLink = `http://localhost:5173/confirm-password-change?token=${token}`;
            await sendConfirmationEmail(user.email, user.prenom, confirmationLink, "update-password-confirmation.html", transporter)

            return res.status(200).json({message: 'Veuillez vérifier votre boîte mail.'});
                        
        }

    } catch (error) {
        const msg = 'Erreur lors de la modification du mot de passe'
        console.log(error);
        return res.status(500).json({message: msg, erreur: error})
    }    
}

const confirmPasswordChange = async (req, res) => {
    const {token} = req.query

    try {
        const secret = fs.readFileSync('./.meow/meowPu.pem')
        const decode = jwt.verify(token, secret)
        const {userId, newPassword} = decode 
        const tour = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, tour)

        await User.updateOne({ _id: userId }, { $set: { password: hashedPassword } })

        res.status(200).json({message: 'Mot de passe modifié avec succès'})

    } catch (error) {
        res.status(400).json({message: 'Le lien de confirmation est invalide ou a expiré', erreur: error})
    }
}

/**
 * Bascule l'état d'un utilisateur entre actif et désactivé.
 * @async
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @param {string} req.params.id - L'identifiant de l'utilisateur dont l'état est modifié.
 * @returns {Promise<void>} Renvoie une réponse JSON avec un message de succès ou d'erreur.
 */
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

const getAuthUserDetails = async (req, res) => {
    const {userId} = req.authData
    try {
        const user = await User.findById(userId)
        const profil = await Profil.findById(user.profilId)
        const msg = 'Utilisateur récupéré avec succès'

        return res.status(200).json({message: msg, data: {user, profil}})
    } catch (error) {
        const msg = 'Erreur lors de la récupération de l\'utilisateur'
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = {
    login,
    addUser,
    getUsers,
    getUserDetails,
    deleteUser,
    requestPasswordChange,
    confirmPasswordChange,
    toggleUserState,
    getAuthUserDetails
}