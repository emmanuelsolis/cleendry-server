// importamos el modelo de usuario
const User = require('../models/User.model');
const mongoose = require("mongoose")


//Leer todos los usuarios
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({role:{$ne:"Admin"}},{password:0, __v:0, createdAt:0, updatedAt:0})
        res.status(200).json({users})
    }catch(err){
        if (error instanceof mongoose.Error.ValidationError) return res.status(400).json({ errorMessage: error.message });
        
        if (error.code === 11000) return res.status(400).json({ errorMessage: "no se encontraron usuarios"});
        
        return res.status(500).json({ errorMessage: error.message });
    }
}