// import { useState, useEffect } from 'react';

// import model
const Order = require("../models/Order.model");
// import mongoose
const mongoose = require("mongoose");
// import utils
const { clearRes } = require("../utils/utils");

// exports.preOrder = async (req, res, next) => {
//   // const [inStage, setInStage] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);

//     useEffect(() => {
//       const { _id } = req.user;
//       const {typeService,zipCode, } = req.body;

//       const stageIn = async (user) => {
//         try {
//           if(!User.find({_employee, },{role:employee,zipCode:_service.zipCode, _isAvailable:true})){
//             throw {
//             err: true,
//             status: res.status,
//             statusText: res.status(401).json({ errorMessage: "No hay empleados disponibles" })
//             };
//             setIsPending(true);
//             // setInStage(inStage);
//             setError({err:false})
//           }
//         } catch (error) {
//           setIsPending(false);
//           setError(error);
//           res.status(200).json({successMessage: 'Orden Tomada con exito!!'});
//         }
//             }
//     }, [isPending]);
//     return {isPending, error};
// }

exports.placeOrder = async (req, res, next) => {
  const {
    orderNumber,
    typeService,
    customerName,
    customerPhone,
    shippingAddress,
    serviceDate,
    serviceTime,
    servicePrice,
    serviceStatus,
    subtotal,
    serviceDescription,
    paymentMethod,
    paymentStatus,
    deliverTime,
  } = req.body;
  try {
    // if(isPending === true){
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
      // _employee: req.user._id,
      _owner: req.user._id,
      // _employee: _id,
      // _service,
    });
    res.status(200).json({ order });
    console.log("order:", order);
    // }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({ errorMessage: "Error al crear producto" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.preOrder = async (req, res, next) => {
  // const { ServiceStatus, ...Order } = req.body;
  console.log("El req.body:",req.body);
  const { id } = req.params;
  const { _id } = req.user;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { _employee: req.user._id, ServiceStatus: "En proceso" },
      { new: true }
    );

    res.status(200).json({ order });
    console.log("order:", order);
    // }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({ errorMessage: "Error al crear producto" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

/* Lista de ordenes para el empeleado  find servicesStatus === Pendiente && el shippingAddress.ZipCode  */

exports.myOrders = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    const orders = await Order.find({ _owner: req.user._id });
    res.status(200).json({ orders });
    console.log("orders:", orders);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({ errorMessage: "Error al crear producto" });

    return res.status(500).json({ errorMessage: error.message });
  }
};
exports.workOrders = async (req, res, next) => {
  const { id } = req.user;
  try {
    const orders = await Order.find({ _employee: req.user._id });
    res.status(200).json({ orders });
    console.log("orders:", orders);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({ errorMessage: "Error al mostrar orden" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.viewOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    res.status(200).json({ order });
    console.log("order:", order);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({ errorMessage: "Error al mostrar orden" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.updateOrder = async (req, res, next) => {
  const { id } = req.params;
  const {
    orderNumber,
    typeService,
    customerName,
    customerPhone,
    shippingAddress,
    serviceDate,
    serviceTime,
    servicePrice,
    serviceStatus,
    subtotal,
    serviceDescription,
    paymentMethod,
    paymentStatus,
    deliverTime,
  } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      {
        orderNumber,
        typeService,
        customerName,
        customerPhone,
        shippingAddress,
        serviceDate,
        serviceTime,
        servicePrice,
        serviceStatus,
        subtotal,
        serviceDescription,
        paymentMethod,
        paymentStatus,
        deliverTime,
      },
      { new: true }
    );
    res.status(200).json({ order });
    console.log("order:", order);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res
        .status(400)
        .json({ errorMessage: "Error al actualizar orden" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    res.status(200).json({ successMessage: "Orden eliminada con exito" });
    console.log("order:", order);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({ errorMessage: "Error al eliminar orden" });

    return res.status(500).json({ errorMessage: error.message });
  }
};
