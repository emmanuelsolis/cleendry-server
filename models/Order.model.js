const { Schema, model } = require("mongoose");


const orderSchema = new Schema(
  {
    serviceSatatus:{
    type: String,
    enum: ['Pendiente', 'En proceso', 'Finalizado'],
    },
    orderNumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
   typeService: {
       type: String,
        enum: ['Lavado en domicilio', 'Recoger para lavado', 'Lavado de Interiores', 'Pulido y encerado'], 
        default: 'Lavar en domicilio',
   },
   customerName: {
         type: String,
        minLenght: 1,
        // required: true,
   },
    customerPhone: {
        type: Number,
        minLenght: 1,
        // required: true,
    },
    shippingAddress:[
        {
          street: {type: String, minLenght: 1},
          houseNumber: {type: Number, minLenght: 1},
          city: {type: String,minLenght: 1,},
          state: {type: String,minLenght: 1,},
          zipCode: {type: Number,minLenght: 1,},
        }
      ],
    // ServiceDate: {
    //     type: Date,
    //     minLenght: 1,
    //     required: true,
    // },
    // ServiceTime: {
    //     type: String,
    //     minLenght: 1,
    //     required: true,
    // },
    servicePrice: {
        type: Number,
        enum:[120, 150, 400, 700],
          /* {
            'Lavado en domicilio': 120, 'Recoger para lavado':150, 'Pulido y encerado':400, 'Lavado de Interiores':700
          } */
        // required: true,
    },
    serviceStatus: {
        type: String,
        enum: ['Pendiente', 'En proceso', 'Finalizado'],
        default: 'Pendiente',
    },
    serviceDescription: {   
        type: String,
        minLenght: 1,
        // required: true,
    },
    subtotal: {
        type: Number,
        minLenght: 1,
        // required: true,
    },
    tax: {
        type: Boolean,
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
    deliverTime: {
        type: Number,
        enum: [1.5, 2, 4, 2.5],
        default: 1.5,
         /*  {
            'Lavado en domicilio':1.5,
            'Recoger para lavado':2, 
            'Lavado de interiores':4, 
            'Pulido y encerado':2.5
          } */
        
        // required: true,
    },
    _owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    _service:{
        type: Schema.Types.ObjectId,
        ref: "WashService",
    },
    // _car: {
    //     type: Schema.Types.ObjectId,// _nearestEmployee:req.user._address[0].zipCode
    //     ref: "User",
    // },
    _employee: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  },
);

const Order  = model("Order", orderSchema);

module.exports = Order;