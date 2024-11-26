const mongoose = require('mongoose')
const Reservation = require('../models/Reservation.model')
const RVUT = require('../models/ReservationVoitureUniteTarification.model')
const RVOL = require('../models/ReservationVoitureOptionDeLocation.model')


const createReservation = async (req, res) => {
    const {clientId} = req.authData
    const {item_name, dateDebut, dateFin, montantTotal, VUT, VOL, command_name} = req.body

    console.log(req.body);
    console.log(clientId);

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
            reservationId: repRes._id,
            voitureUniteTarificationId: vutjson.VUTId
        }], { session })

        const voltab = VOL.split(",").map(vol => JSON.parse(vol.trim()))
        await Promise.all(voltab.map(vol => {
            return RVOL.create([{
                nbrVoitureOptionLocation: 1,
                prix: vol.tarifOption,
                reservationId: repRes._id,
                voitureOptionLocationId: vol.volId
            }], { session })
        }))

        await session.commitTransaction()
        session.endSession()

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        console.error(error)
        res.status(500).json({ message: 'Erreur lors de la création de la réservation', error })
    }
}

module.exports = {
    createReservation
}