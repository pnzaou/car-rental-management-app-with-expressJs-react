const express = require('express')
const router = express.Router()
const { addDroit, getDroits, updateDroit, deleteDroit } = require('../controllers/droit.controller')
const { addProfil, getProfils, getProfilDetails, updateProfil, updateProfilDroits, deleteProfil } = require('../controllers/profil.controller')
const { addUser, getUsers, login, getUserDetails, deleteUser, updatePassword, toggleUserState } = require('../controllers/user.controller')
const verifyToken = require('../middlewares/verifyToken.middleware')
const { addCategorie, updateCategorie, getCategories, deleteCategorie } = require('../controllers/categorie.controller')

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
router.post('/api/login', login)
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








module.exports = router