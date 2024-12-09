const mongoose = require('mongoose')
const fetch = require('node-fetch')
require('dotenv').config()
const Reservation = require('../models/Reservation.model')
const RVUT = require('../models/ReservationVoitureUniteTarification.model')
const RVOL = require('../models/ReservationVoitureOptionDeLocation.model')
const payementRequestUrl = "https://paytech.sn/api/payment/request-payment"
const headers = {
    Accept: "application/json",
    'Content-Type': "application/json",
    API_KEY: process.env.PAYTECH_API_KEY,
    API_SECRET: process.env.PAYTECH_SECRET_KEY
}


const createReservation = async (req, res) => {
    const {clientId, clientNom, clientPrenom} = req.authData
    const {item_name, dateDebut, dateFin, montantTotal, VUT, VOL, command_name} = req.body

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const repRes = await Reservation.create([{
            clientId, dateDebut, dateFin, montantTotal
        }], { session })

        const vutjson = JSON.parse(VUT)
        await RVUT.create([{
            nbrVoitureUniteTarification: vutjson.nbrVUT,
            prix: vutjson.prix,
            reservationId: repRes[0]._id,
            voitureUniteTarificationId: vutjson.VUTId
        }], { session })

        const voltab = VOL.split(", ").map(vol => JSON.parse(vol))
        await Promise.all(voltab.map(vol => {
            return RVOL.create([{
                nbrVoitureOptionLocation: 1,
                prix: vol.tarifOption,
                reservationId: repRes._id,
                voitureOptionLocationId: vol.volId
            }], { session })
        }))

        const repPay = await fetch(payementRequestUrl, {
            method: 'post',
            headers: headers,
            body: JSON.stringify({
                item_name,
                item_price: montantTotal,
                currency: "XOF",
                ref_command: `${clientPrenom}-${clientNom}-${Math.floor(Date.now() / 1000).toString()}`,
                command_name,
                env: "test",
                ipn_url: "https://paytech-server-side.onrender.com/api/paytech/ipn",
                success_url: "https://paytech-client-side.web.app",
                cancel_url: "https://paytech-client-side.web.app"
            })
        })

        const jsonRep = await repPay.json()

        await session.commitTransaction()
        session.endSession()

        if(jsonRep.success === 1) {
            return res.status(200).json({
                message: "Votre réservation a été créée avec succès vous allez être rediriger pour procéder au payement.",
                success: true,
                redirect_url: jsonRep.redirect_url,
                token: jsonRep.token
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Réservation créée avec succès. Impossible de procéder au payement en ligne. Veuillez vous rendre à l'agence."
            })
        }

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        console.error(error.message)
        res.status(500).json({success: false, message: 'Une erreur est survenue veuillez réessayer.', error })
    }
}

module.exports = {
    createReservation
}