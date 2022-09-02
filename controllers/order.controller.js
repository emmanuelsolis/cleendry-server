// import model 
const Order = require("../models/Order.model");
// import mongoose 
const mongoose = require("mongoose");
// import utils 
const { clearRes } = require("../utils/utils");

exports.placeOrder = async (req, res, next) => {
    const { orderNumber, typeService, customerName, customerPhone, shippingAddress, serviceDate, serviceTime, servicePrice, serviceStatus,subtotal, serviceDescription, paymentMethod, paymentStatus,deliverTime } = req.body;
    try {
        const order = await Order.create({
        orderNumber,
        typeService,
        customerName,
        customerPhone,
        shippingAddress,
        serviceDate,
        serviceTime,
        servicePrice,
        serviceStatus,
        serviceDescription,
        subtotal,
        paymentMethod,
        paymentStatus,
        deliverTime,
        // _clientOwner,
        // _service,
        // _nearestEmployee,
        // _whoTakeOrder,
        });
        res.status(200).json({ order });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError)
          return res.status(400).json({ errorMessage: error.message });
    
        if (error.code === 11000)
          return res.status(400).json({ errorMessage: "Error al crear producto" });
    
        return res.status(500).json({ errorMessage: error.message });
      }
}