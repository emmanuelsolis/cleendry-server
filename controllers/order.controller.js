// import model
const Order = require("../models/Order.model");
// import mongoose
const mongoose = require("mongoose");
// import utils
const { clearRes } = require("../utils/utils");



exports.placeOrder = async (req, res, next) => {
  const { _id } = req.params;
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
      _owner: req.user._id,
      // _service: req.data._id
    });
    res.status(200).json({ order });
    console.log("order:", order);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError)
      return res.status(400).json({ errorMessage: error.message });

    if (error.code === 11000)
      return res.status(400).json({ errorMessage: "Error al crear producto" });

    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.takeOrder = async (req, res, next) => {
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
