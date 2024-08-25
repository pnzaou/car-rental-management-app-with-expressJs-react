const fs = require('fs')

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

module.exports = {
    deleteLogo
}