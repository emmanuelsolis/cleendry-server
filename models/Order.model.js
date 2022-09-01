const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    orderNumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
   shippingType: {
       type: String,
        enum: ['Lavado en domicilio', 'Recoger para lavado', 'Lavado de Interiores', 'Pulido y encerado'], 
        default: 'Lavar en domicilio',
   },
   customerName: {
         type: String,
        minLenght: 1,
        required: true,
   },
    customerPhone: {
        type: Number,
        minLenght: 1,
        required: true,
    },
    shippingAddress:[
        {
          street: {type: String, minLenght: 1},
          houseNumber: {type: Number, minLenght: 1},
          city: {type: String,minLenght: 1,},
          state: {type: String,minLenght: 1,},
          zipCode: {type: Number,minLenght: 1,},
          required: true,
        }
      ],
    ServiceDate: {
        type: Date,
        minLenght: 1,
        required: true,
    },
    ServiceTime: {
        type: String,
        minLenght: 1,
        required: true,
    },
    ServicePrice: {
        type: Number,
        enum:[{'Lavado en domicilio': 100}, {'Recoger para lavado': 150}, {'Lavado de interiores': 700}, {'Pulido y encerado': 400}],
        required: true, 
    },
    ServiceStatus: {
        type: String,
        enum: ['Pendiente', 'En proceso', 'Finalizado'],
        default: 'Pendiente',
    },
    ServiceDescription: {   
        type: String,
        minLenght: 1,
        required: true,
    },
    subtotal: {
        type: Number,
        minLenght: 1,
        required: true,
    },
    tax: {
        type: Number,
        enum: [false, true],
        default: false,
    },
    paymentMethod: {
        type: String,
        enum: ['Efectivo', 'Tarjeta de crédito', 'Tarjeta de débito', 'paypal'],
        default: 'Efectivo',
    },
    paymentStatus: {
        type: String,
        enum: ['Pendiente', 'Pagado'],
        default: 'Pendiente',
    },
    timeToDeliver: {
        type: Number,
        default:1.5,
        required: true,
    },
    _nearestEmployee: {
        type: Schema.Types.ObjectId,// _nearestEmployee:req.user._address[0].zipCode
        ref: "User",
        required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Order  = model("Session", orderSchema);

module.exports = Order;