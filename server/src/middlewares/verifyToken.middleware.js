const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        return res.status(403).json({message: "Accès refusé"})
    } else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if(err){
                return res.status(401).json({message: 'Token invalid'})
            } else {
                req.userData = decode
                next()
            }
        })
    }
}

module.exports = verifyToken