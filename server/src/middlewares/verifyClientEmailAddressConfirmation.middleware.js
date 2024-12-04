const Client = require("../models/Client.model")
const jwt = require("jsonwebtoken")
const fs = require('fs')
const {sendConfirmationEmail, transporter} = require("../services")

const verifyClientEmailAddressConfirmation = async (req, res, next) => {
    const {email} = req.body    
    try {
        const client = await Client.findOne({email})
        if(!client) {
            return res.status(401).json({message: 'Email ou mot de passe incorrect !'})
        } else {
            if(!client.emailVerif) {
                const secret = fs.readFileSync('./.meow/meowPr.pem')
                const token = jwt.sign({email: client.email}, secret, {algorithm: "RS256"})
                const confirmationLink = `http://localhost:5173/email-address-confirmation?token=${token}`;
                await sendConfirmationEmail(
                    client.email,
                    client.prenom,
                    confirmationLink,
                    "first-login-email-verification.html",
                    transporter
                )
                return res.status(403).json({
                    message: "Vous n'avez pas vérifier votre email à l'inscription. Nous vous vons envoyé un mail de verification"
                })
            } else {
                req.ClientData = client
                next()
            }
        }
    } catch (error) {
        console.log("erreur d'authentification client", error.message);
        return res.status(500).json({message: "Une erreur est survenue veuillez réessayer"})
    }
}

module.exports = verifyClientEmailAddressConfirmation