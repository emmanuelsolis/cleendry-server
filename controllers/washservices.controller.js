const WashService = require('../models/WashService.model');
const mongoose = require("mongoose")
const { clearRes } = require('../utils/utils')
const cloudinary = require('cloudinary')

exports.createService = async (req, res, next) => {
    const { typeService, price, description, photoServiceUrl, timeToDelivery } = req.body;
    try {
        const service = await WashService.create({typeService, price, description, photoServiceUrl, timeToDelivery})
        const newService = clearRes(service.toObject());
        res.status(200).json({ service: newService, successMessage: "Servicio creado" });
    }catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
          return res.status(400).json({ errorMessage: error.message });
    
        if (error.code === 11000)
          return res.status(400).json({ errorMessage: "Error al crear producto" });
    
        return res.status(500).json({ errorMessage: error.message });
      }
}

exports.viewCardService = async (req, res, next) => {
    const { id } = req.params;
    console.log("este es el req.body", req.body)
    try {
        const cardService = await WashService.findById(id);
        const newCardService = clearRes(cardService.toObject());
        res.status(200).json({ cardService: newCardService});
    }catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
          return res.status(400).json({ errorMessage: error.message });
    
        if (error.code === 11000)
          return res.status(400).json({ errorMessage: "Error al crear producto" });
    
        return res.status(500).json({ errorMessage: error.message });
      }
}

exports.updateService = async (req, res, next) => {
    const { id } = req.params;
    const { typeService, price, description, photoServiceUrl, timeToDelivery } = req.body;
    try {
        const service = await WashService.findByIdAndUpdate(id, {typeService, price, description, photoServiceUrl, timeToDelivery}, {new:true})
        const newService = clearRes(service.toObject());
        res.status(200).json({ service: newService, successMessage: "Servicio actualizado" });
    }catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
          return res.status(400).json({ errorMessage: error.message });
    
        if (error.code === 11000)
          return res.status(400).json({ errorMessage: "Error al crear producto" });
    
        return res.status(500).json({ errorMessage: error.message });
      }
}

exports.deleteService = async (req, res, next) => {
  const { id } = req.params;
  try {
     await WashService.findByIdAndDelete(id)
      res.status(200).json({successMessage: "Servicio eliminado" });
  }catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        return res.status(400).json({ errorMessage: error.message });
  
      if (error.code === 11000)
        return res.status(400).json({ errorMessage: "Error al eliminar el producto" });
  
      return res.status(500).json({ errorMessage: error.message });
    }
}
 