const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken.middleware')
const { uploadMultiple, uploadSingle, uploadMultipleClient } = require('../middlewares/multer.middleware')
const { addDroit, getDroits, updateDroit, deleteDroit } = require('../controllers/droit.controller')
const { addProfil, getProfils, getProfilDetails, updateProfil, updateProfilDroits, deleteProfil } = require('../controllers/profil.controller')
const { addUser, getUsers, login, getUserDetails, deleteUser, updatePassword, toggleUserState } = require('../controllers/user.controller')
const { addCategorie, updateCategorie, getCategories, deleteCategorie } = require('../controllers/categorie.controller')
const { addMarque, getMarques, deleteMarque, updateMarque } = require('../controllers/marque.controller')
const { addModele, getModeles, updateModele, deleteModele } = require('../controllers/modele.controller')
const { addVoiture, getVoitues, updateVoiture, deleteVoiture } = require('../controllers/voiture.controller')
const { signUp, signIn, getClients, updateAcountDetails, changePassword } = require('../controllers/client.controller')
const { addOption, getOptions, updateOption, deleteOption } = require('../controllers/optionDeLocation.controller')
const { addUnite, getUnites, updateUnite, deleteUnite } = require('../controllers/uniteTarification.controller')
const { addMaintenance, getMaintenances, updateMaintenance, deleteMaintenance } = require('../controllers/maintenance.controller')
const { addCharge, getCharges, updateCharge, deleteCharge } = require('../controllers/charge.controller')
const { sendNotification, getNotifications } = require('../controllers/notification.controller')
const { addFavori, getFavoris, deleteFavori } = require('../controllers/favori.controller')

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
   

//Routes liées aux USERS
router.post('/api/user/login', login)
router.route('/api/users')
    .post(addUser)
    .get(getUsers)
router.patch('/api/user/password', verifyToken, updatePassword)
router.route('/api/user/:id')
    .get(getUserDetails)
    .delete(deleteUser)
    .patch(toggleUserState)



//Routes liées aux CATEGORIES
router.route('/api/categories')
    .post(addCategorie)
    .get(getCategories)
router.route('/api/categorie/:id')
    .put(updateCategorie)
    .delete(deleteCategorie)


//Routes liées aux MARQUES
router.route('/api/marques')
    .post(uploadSingle, addMarque)
    .get(getMarques)
router.route('/api/marque/:id')
    .put(uploadSingle, updateMarque)
    .delete(deleteMarque)


//Routes liées aux MODELES
router.post('/api/modeles', addModele)
router.get('/api/modeles/:idMarque', getModeles)
router.route('/api/modele/:idMarque/:id')
    .put(updateModele)
    .delete(deleteModele)


//Routes liées aux VOITURES
router.route('/api/voitures')
    .post(uploadMultiple, addVoiture)
    .get(getVoitues)
router.route('/api/voiture/:id')
    .put(uploadMultiple, updateVoiture)
    .delete(deleteVoiture)


//Routes liées aux CLIENTS
router.route('/api/clients')
    .post(uploadMultipleClient, signUp)
    .get(getClients)
router.post('/api/client/signin', signIn)
router.post('/api/client/updateAcount', verifyToken, updateAcountDetails)
router.patch('/api/client/changePassword', verifyToken, changePassword)


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


module.exports = router