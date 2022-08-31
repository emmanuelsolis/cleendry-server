//middleware para verificar si el usuario esta logueado y otro para verificar el rol

const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const { clearRes } = require('../utils/utils')

exports.verifyToken = (req, res, next) => {
    //Destructuramos las  cookies 
    const { headload, signature } = req.cookies

    if (!headload || !signature) {
        return res.status(401).json({
            errorMessage: 'No tienes autorización'
        })
    }
    // jwt.verify(jwt, SECRET_KEY, (err, decoded) => {})
    jwt.verify(`${headload}.${signature}`, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                errorMessage: 'No cuentas con autorización'
            })
        }
        //decoded = { userId, role, email...}
        //findById es una promesa
        User.findById(decoded.userId)
        .then((user) => {
            console.log("The user", user)
            req.user = clearRes(user.toObject())
            next()
        })
        .catch((err) => {
            console.log("The req.body", req.body)
            res.status(500).json({
                errorMessage: 'Error al buscar el usuario'
            })
        })
    })//--> end verify
}

exports.checkRole = (arrayRoles) => {
    return (req, res, next) => {
        //sacamos el rol del req.user
        const { role } = req.user
        // validamos si el rol esta en el array de roles
        if (arrayRoles.includes(role)) {
            next()
        }else {
            res.status(403).json({
                errorMessage: 'No tienes autorización para realizar esta acción'
            })
        }
    }
}