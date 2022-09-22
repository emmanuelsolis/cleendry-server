const Car = require('../models/Car.model');
const mongoose = require("mongoose")
const { clearRes } = require('../utils/utils')
const cloudinary = require('cloudinary')

exports.registerCar = async (req, res, next) => {
    
    const { carName, carModel, carYear, carPlate, carColor, carBrand, imageUrl } = req.body;
    try {
        
        const savedCar = await Car.create( {carName, carModel, carYear, carPlate, carColor, carBrand, imageUrl, _owner: req.user._id} )
        const cleanCar = clearRes(savedCar.toObject());
        res.status(200).json({
            successMessage: "Carro registrado",
            savedCar: cleanCar
        });
        console.log(savedCar)
    }catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
          return res.status(400).json({ errorMessage: error.message });
    
        if (error.code === 11000)
          return res.status(400).json({ errorMessage: "Error al crear producto" });
    
        return res.status(500).json({ errorMessage: error.message });
      }
}

exports.getOne = async (req, res, next) => {
    const { carPlate } = req.params;
    try{
        const car = await Car.findOne({carPlate})
        const newCar = clearRes(car.toObject());
        res.status(200).json({car:newCar})
    }catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
          return res.status(400).json({ errorMessage: error.message });
    
        if (error.code === 11000)
          return res.status(400).json({ errorMessage: "su coche no se encontró" });
    
        return res.status(500).json({ errorMessage: error.message });
      }
}

exports.getCars = async (req, res, next) => {
    try{
        const cars = await Car.find({_owner: req.user._id}, {
            __v: 0,
            createdAt: 0,
            updatedAt: 0
        })
        res.status(200).json({cars})
    }catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
          return res.status(400).json({ errorMessage: error.message });
    
        if (error.code === 11000)
          return res.status(400).json({ errorMessage: "Error al crear producto" });
    
        return res.status(500).json({ errorMessage: error.message });
      }
}

exports.editCarInfo = async (req, res, next) => {
    const { id } = req.params;
    try{
        const car = await Car.findByIdAndUpdate(
            id,
            {...req.body},
            {new: true}
            );
        const newCar = clearRes(car.toObject());
        res.status(200).json({car: newCar});
    }catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
          return res.status(400).json({ errorMessage: error.message });
    
        if (error.code === 11000)
          return res
            .status(400)
            .json({ errorMessage: "Error al actualizar producto" });
    
        return res.status(500).json({ errorMessage: error.message });
      }
}

exports.deleteCar = async (req, res, next) => {
    const { id } = req.params;
    const { carName } = req.body;
    try{
        const car = await Car.findByIdAndDelete(id);
        res.status(201).json({successMessage: `Su auto fue eliminado correctamente`})
    }catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
          return res.status(400).json({ errorMessage: error.message });
    
        if (error.code === 11000)
          return res
            .status(400)
            .json({ errorMessage: "Error al eliminar coche" });
    
        return res.status(500).json({ errorMessage: error.message });
      }
}