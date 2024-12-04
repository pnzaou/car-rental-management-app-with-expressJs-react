const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken.middleware')
const { uploadMultiple, uploadSingle, uploadMultipleClient } = require('../middlewares/multer.middleware')
const { addDroit, getDroits, updateDroit, deleteDroit } = require('../controllers/droit.controller')
const { addProfil, getProfils, getProfilDetails, updateProfil, updateProfilDroits, deleteProfil, getProfil } = require('../controllers/profil.controller')
const { addUser, getUsers, login, getUserDetails, deleteUser, toggleUserState, getAuthUserDetails, requestPasswordChange, confirmPasswordChange } = require('../controllers/user.controller')
const { addCategorie, updateCategorie, getCategories, deleteCategorie, getCategorieById } = require('../controllers/categorie.controller')
const { addMarque, getMarques, deleteMarque, updateMarque, getMarqueById, getMarquesWithTheirModeles } = require('../controllers/marque.controller')
const { addModele, getModeles, updateModele, deleteModele } = require('../controllers/modele.controller')
const { addVoiture, getVoitues, updateVoiture, deleteVoiture, getVoituresDetailsForClient } = require('../controllers/voiture.controller')
const { signUp, signIn, getClients, updateAcountDetails, changePassword, requestPasswordRecovery, confirmPasswordRecovery, validationEmail } = require('../controllers/client.controller')
const { addOption, getOptions, updateOption, deleteOption } = require('../controllers/optionDeLocation.controller')
const { addUnite, getUnites, updateUnite, deleteUnite } = require('../controllers/uniteTarification.controller')
const { addMaintenance, getMaintenances, updateMaintenance, deleteMaintenance } = require('../controllers/maintenance.controller')
const { addCharge, getCharges, updateCharge, deleteCharge } = require('../controllers/charge.controller')
const { sendNotification, getNotifications } = require('../controllers/notification.controller')
const { addFavori, getFavoris, deleteFavori } = require('../controllers/favori.controller')
const { createReservation } = require('../controllers/reservation.controller')
const verifyClientEmailAddressConfirmation = require('../middlewares/verifyClientEmailAddressConfirmation.middleware')

//Routes liées aux DROITS
router.route('/api/droits')
    .post(addDroit)
    .get(getDroits)
router.route('/api/droit/:id')
    .put(updateDroit)
    .delete(deleteDroit)


//Routes liées aux PROFILS
router.route('/api/profils')
    .post(addProfil)
    .get(getProfils)
router.route('/api/profil/:id')
    .get(getProfilDetails)
    .put(updateProfilDroits, updateProfil)
    .delete(deleteProfil)
router.get('/api/profil/nom/:id', verifyToken, getProfil)
   

//Routes liées aux USERS
router.post('/api/user/login', login)
router.route('/api/users')
    .post(addUser)
    .get(verifyToken, getUsers)
router.patch('/api/user/password', verifyToken, requestPasswordChange)
router.get('/api/user/confirm-password-change', confirmPasswordChange)
router.route('/api/user/:id')
    .get(getUserDetails)
    .delete(deleteUser)
    .patch(verifyToken, toggleUserState)
router.get('/api/user', verifyToken, getAuthUserDetails)



//Routes privées liées aux CATEGORIES
router.route('/api/categories')
    .post(verifyToken, addCategorie)
    .get(verifyToken, getCategories)
router.route('/api/categorie/:id')
    .get(verifyToken, getCategorieById)
    .put(verifyToken, updateCategorie)
    .delete(verifyToken, deleteCategorie)

//Routes publiques liées aux CATEGORIES
router.get('/api/public/categories', getCategories)

//Routes privées liées aux MARQUES
router.route('/api/marques')
    .post(uploadSingle, addMarque)
    .get(getMarques)
router.route('/api/marque/:id')
    .get(getMarqueById)
    .put(uploadSingle, updateMarque)
    .delete(deleteMarque)
router.get('/api/marques_and_their_modeles', verifyToken, getMarquesWithTheirModeles)

//Routes publiques liées aux MARQUES
router.get("/api/public/marques", getMarques)

//Routes privées liées aux MODELES
router.post('/api/modeles/:marqueId', addModele)
router.get('/api/modeles/:idMarque', getModeles)
router.route('/api/modele/:idMarque/:id')
    .put(updateModele)
    .delete(deleteModele)

//Routes publiques liées aux MODELES
router.get("/api/public/modeles/:idMarque", getModeles)

//Routes liées aux VOITURES
router.route('/api/voitures')
    .post(verifyToken, uploadMultiple, addVoiture)
    .get(verifyToken, getVoitues)
router.route('/api/voiture/:id')
    .put(uploadMultiple, updateVoiture)
    .delete(deleteVoiture)

//Routes publiques liées aux VOITURES
router.get('/api/public/voitures', getVoitues)
router.get('/api/public/voiture/:id', getVoituresDetailsForClient)

//Routes liées aux CLIENTS
router.route('/api/clients')
    .post(uploadMultipleClient, signUp)
    .get(getClients)
router.post('/api/client/signin', verifyClientEmailAddressConfirmation, signIn)
router.put('/api/client/updateAcount', verifyToken, updateAcountDetails)
router.patch('/api/client/changePassword', verifyToken, changePassword)
router.post('/api/client/request-password-recovery', requestPasswordRecovery)
router.patch('/api/client/confirm-password-recovery', confirmPasswordRecovery)
router.get('/api/client/email-address-confirmation', validationEmail)


//Routes liées aux OPTIONS
router.route('/api/options')
    .post(addOption)
    .get(getOptions)
router.route('/api/option/:id')
    .put(updateOption)
    .delete(deleteOption)


//Routes liées aux UNITES
router.route('/api/unites')
    .post(addUnite)
    .get(getUnites)
router.route('/api/unite/:id')
    .put(updateUnite)
    .delete(deleteUnite)

    
//Routes liées aux MAINTENANCES
router.post('/api/maintenances', addMaintenance)
router.get('/api/maintenances/:idVoiture', getMaintenances)
router.route('/api/maintenance/:idVoiture/:id')
    .put(updateMaintenance)
    .delete(deleteMaintenance)


//Routes liées aux CHARGES
router.route('/api/charges')
    .post(addCharge)
    .get(getCharges)
router.route('/api/charge/:id')
    .put(updateCharge)
    .delete(deleteCharge)


//Routes liées aux NOTIFICATIONS
router.route('/api/notifications')
    .post(verifyToken, sendNotification)
    .get(getNotifications)


//Routes liées aux FAVORIS
router.get('/api/favoris', verifyToken, getFavoris)
router.route('/api/favori/:id')
    .post(verifyToken, addFavori)  
    .delete(verifyToken, deleteFavori)

//Routes liées aux RESERVATIONS
router.post('/api/reservations', verifyToken, createReservation)


module.exports = router