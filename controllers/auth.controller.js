// importar modelo de usuario
const User = require('../models/User.model');
// importar mongoose para conectar con la base de datos
const mongoose = require('mongoose');
// importar bcrypt para encriptar contraseñas
const bcryptjs = require('bcryptjs');
// importar JsonWebToken para generar tokens
const { clearRes, createJWT } = require('../utils/utils');

exports.signupProcess = async (req, res, next) => {
    const { role, email, password, confirmPassword, ...restUser} = req.body
    console.log("el Body es: ", req.body);
    try {
        if(!email.length || !password.length || !confirmPassword.length) {
            return res.status(400).json({errorMessage: 'Los campos no deben estar vacios'});
        }
        if(password !== confirmPassword) {
            return res.status(400).json({errorMessage: 'Las contraseñas no coinciden'});
        }
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(!regex.test(password)) {
            return res.status(400).json({errorMessage: 'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero'});
        }
        const userFounded = await User.findOne({email})
        if(userFounded) {
            return res.status(400).json({errorMessage: 'Este correo ya esta registrado'});
        }
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(password,salt);

        const user = await User.create({ email, password: hashedPassword, ...restUser });
        const [header, payload, signature] = createJWT(user);
        res.cookie("headload", `${header}.${payload}`, {
            maxAge: 1000 * 60 * 30,
            httpOnly: true,
            sameSite: 'strict',
            secure:false,
        });
        res.cookie("signature", signature, {
            maxAge: 1000 * 60 * 30,
            httpOnly: true,
            sameSite: 'strict',
            secure:false,
        });
        const newUser = clearRes(user.toObject());
        res.status(201).json({user:newUser});
    }catch(error) {
        if (error instanceof mongoose.Error.ValidationError) return res.status(400).json({ errorMessage: error.message });
        
        if (error.code === 11000) return res.status(400).json({ errorMessage: "El correo electronico ya esta en uso"});
        
        return res.status(500).json({ errorMessage: error.message });
    }
};

exports.loginProcess = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if(!email || !password || !email.length || !password.length) {
            return res.status(400).json({errorMessage: 'Los campos no deben estar vacios'});
        }
        const user = await User.findOne({email});
        if(!user)  return res.status(400).json({errorMessage: 'Credenciales invalidas'});

        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(!regex.test(password)) {
            return res.status(400).json({errorMessage: 'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un numero'});
        }
        if(!bcryptjs.compareSync(password,user.password)) return res.status(400).json({errorMessage: 'Credenciales invalidas'})

        const [header, payload, signature] = createJWT(user);
        res.cookie("headload", `${header}.${payload}`, {
            maxAge: 1000 * 60 * 30,
            httpOnly: true,
            sameSite: 'strict',
            secure:false,
        });
        res.cookie("signature", signature, {
            maxAge: 1000 * 60 * 30,
            httpOnly: true,
            sameSite: 'strict',
            secure:false,
        });
        //Limpiamos la respuesta del moongose
        const newUser = clearRes(user.toObject());
        res.status(200).json({user:newUser});

    }catch(error) {
        if (error instanceof mongoose.Error.ValidationError) return res.status(400).json({ errorMessage: error.message });
        if (error.code === 11000) return res.status(400).json({errorMessage: "El correo electronico ya esta en uso"});
        return res.status(500).json({ errorMessage: error.message });
    }
}

exports.logoutProcess = async (req, res, next) => {
    res.clearCookie("headload");
    res.clearCookie("signature");
    res.status(200).json({message: 'Sesión cerrada, regresa pronto!'});
}