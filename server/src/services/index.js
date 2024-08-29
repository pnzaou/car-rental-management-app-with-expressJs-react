const fs = require('fs')
const nodemailer = require('nodemailer')

const deleteLogo = (file) => {
    const fileArray = file.split('/')
    const name = fileArray[fileArray.length - 1]
    fs.unlink(`./src/uploads/${name}`, (err) => {
        if(err) {
            console.log('Erreur lors de la suppression du fichier:', err.message)
            return
        }
        console.log('fichier supprimé avec succès.');
    })
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'perrinemmanuelnzaou@gmail.com',
    pass: 'plorvjvqayyjuuhq',
  },
});


module.exports = {
    deleteLogo,
    transporter
}