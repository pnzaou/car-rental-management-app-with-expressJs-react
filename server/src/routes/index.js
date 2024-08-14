const express = require('express')
const router = express.Router()
const { addDroit, getDroits, updateDroit, deleteDroit } = require('../controllers/droit.controller')
const { addProfil } = require('../controllers/profil.controller')

//Routes liées au controleur DROIT
router.route('/api/droits')
    .post(addDroit)
    .get(getDroits)
router.route('/api/droit/:id')
    .put(updateDroit)
    .delete(deleteDroit)

//Routes liées au controleur PROFIL
router.route('/api/profils')
    .post(addProfil)








module.exports = router