const { Schema, model } = require("mongoose");

const carSchema = new Schema(
  {
    carName: { 
        type: String,
        required: true,
        trim: true,
    },
    carModel: {
        type: String,
        required: true,
    },
    carYear: {
        type: Number,
        required: true,
    },
    carPlate: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    carColor: {
        type: String,
        required: true,
    },
    carBrand: {
        type: String,
        required: true,
    },
    carPhoto: {
        type: String,
        required: true,
    },


  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Car = model("Car", carSchema);

module.exports = Car;
