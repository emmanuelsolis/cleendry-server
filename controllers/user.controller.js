// importamos el modelo de usuario
const User = require('../models/User.model');
const mongoose = require("mongoose")
const { clearRes } = require('../utils/utils')



exports.getLoggedUser = (req, res, next) => {
    //User.findById(req.user._id)
    res.status(200).json({user:req.user})
}

exports.editProfile = (req, res, next) => {
    // destructuramos el rol para que nadie lo pueda utilizarK
    console.log("hey, si entreeeeee")
    const { password,...resUser } = req.body;
    //destructuramos el {_id} del req.user para encontrar el usuario a editar
    const { _id } = req.user;
    console.log("EL REQQQUSSSER", req.user)
    User.findByIdAndUpdate(_id, {...resUser}, {new:true})
    .then(user => {
        console.log('yo soy yser de promise', user)
        const newUser = clearRes(user.toObject());//error
        console.log("newUser", newUser)
        res.status(200).json({user:newUser})
    })
    .catch(err => {
        if (err instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ errorMessage: err.message });
        }
        
        if (err.code === 11000) {
            return res.status(400).json({ errorMessage: "Error al editar su perfil"});
        }
        return res.status(500).json({ errorMessage: err.message });
    })
}

exports.getUserById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id)
        const newUser = clearRes(user.toObject());
        res.status(200).json({user:newUser})
    }catch(err){
        if (err instanceof mongoose.Error.ValidationError) return res.status(400).json({ errorMessage: err.message });
        
        if (err.code === 11000) return res.status(400).json({ errorMessage: "No se encontrĂ³ el usuario"});
        
        return res.status(500).json({ errorMessage: err.message });
    }
}

//Eliminar usuario
exports.deleteAccount = async (req, res, next) => {
    const {_id} = req.user;
    try {
        console.log("objectId", _id)
        const user = await User.findByIdAndDelete(_id)
        res.clearCookie("headload");
        res.clearCookie("signature");
        res.status(200).json({successMessage: "Usuario eliminado"})
    }catch(err){
        if (error instanceof mongoose.Error.ValidationError) return res.status(400).json({ errorMessage: error.message });
        
        if (error.code === 11000) return res.status(400).json({ errorMessage: "No se pudo eliminar el usuario"});
        
        return res.status(500).json({ errorMessage: error.message });
    }
}