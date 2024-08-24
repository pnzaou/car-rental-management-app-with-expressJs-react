const multer = require('multer')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype]
        cb(null, name + Date.now() + '.' + extension)
    }
})

const uploadSingle = multer({storage}).single('image')
const uploadMultiple = multer({storage}).array('images')

module.exports = {
    uploadSingle,
    uploadMultiple
}