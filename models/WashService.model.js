const { Schema, model } = require("mongoose");

const washServiceSchema = new Schema(
  {
    typeService: {
        type: String,
        enum:['Lavado en domicilio', 'Recoger para lavado', 'Lavado de interiores', 'Pulido y encerado'],
    },
    price: {
        type: Number,
        enum:[
          {
            'Lavado en domicilio': 120, 'Recoger para lavado':150, 'Pulido y encerado':400, 'Lavado de Interiores':700
          }
        ],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photoServiceUrl: {
        type: String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFEJKxq7pndja2HT0cXjs3efebYI9vMyNW4w&usqp=CAU',
        required: true,
    },
    deliverTime: {
        type: Number,
        enum: [
          {
            'Lavado en domicilio':1.5,
            'Recoger para lavado':2, 
            'Lavado de interiores':4, 
            'Pulido y encerado':2.5
          }
        ],
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