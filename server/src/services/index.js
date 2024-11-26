const fs = require('fs')
const nodemailer = require('nodemailer')
const path = require('path')

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

const sendConfirmationEmail = async (userEmail, userName, confirmationLink, filename, transporter) => {
  const emailTemplatePath = path.join('src', 'mails', filename)
  const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8')

  const emailContent = emailTemplate
      .replace('{{username}}', userName)
      .replace('{{confirmationLink}}', confirmationLink)

  let mailOptions = {
      from: 'perrinemmanuelnzaou@gmail.com',
      to: userEmail,
      subject: 'Confirmation de modification de mot de passe',
      html: emailContent
  }

  try {
      await transporter.sendMail(mailOptions)
      console.log('Email envoyé avec succès.')
  } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error)
  }
}

module.exports = {
    deleteLogo,
    transporter,
    sendConfirmationEmail
}