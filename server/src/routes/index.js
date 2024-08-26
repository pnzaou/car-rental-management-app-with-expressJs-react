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
router.route('/api/user/:id')
    .get(getUserDetails)
    .delete(deleteUser)
    .patch(toggleUserState)
router.patch('/api/user/password', verifyToken, updatePassword)


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
router.route('/api/modeles')
    .post(addModele)
    .get(getModeles)
router.route('/api/modele/:id')
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


module.exports = router