const { Schema, model } = require("mongoose");

const washServiceSchema = new Schema(
  {
    typeService: {
        type: String,
        enum:['Lavado en domicilio', 'Recoger para lavado', 'Lavado de interiores', 'Pulido y encerado'],
    },
    price: {
        type: Number,
        enum:[{'Lavado en domicilio': 100}, {'Recoger para lavado': 150}, {'Lavado de interiores': 700}, {'Pulido y encerado': 400}],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photoServiceUrl: {
        type: String,
        required: true,
    },
    timeToDelivery: {
        type: Number,
        enum: [{'Lavado en domicilio':1.5}, {'Recoger para lavado':2}, {'Lavado de interiores':4}, {'Pulido y encerado':2.5}],
        required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const WashService = model("WashService", washServiceSchema);

module.exports = WashService;