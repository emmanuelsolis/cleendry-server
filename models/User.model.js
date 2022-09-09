const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,  // -> Ideally, should be unique, but its up to you
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      trim: true,
    },
    password: {
      type:String, 
      required: true
    },
    role: {
      type:String,
      enum: ['Admin', 'Client', 'Employee'],
      default: 'Client'
    },
    firstName: {
      type: String,
      minLenght: 1,
    },
    lastName: {
      type: String,
      minLenght: 1,
    },
    age: {
      type: Number,
      min: 18,
    },
    phoneNumber: {
      type: Number,
      minLenght: 1,
    },
    isAvailable: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    address: [
      {
       street : {type: String, minLenght: 1},
       houseNumber: {type: Number, minLenght: 1},
       city: {type: String,minLenght: 1,},
       state: {type: String,minLenght: 1,},
       zipCode: {type: Number,minLenght: 1,},
      },
    ],
   
    billingCard: [
      {
        cardNumber: {type: Number, minLenght: 10, required: true},
        cardName: {type: String, minLenght: 1, required: true},
        expirationDate: {type: Date, required: true},
        cvv: {type: Number, minLenght: 3, required: true},
        billingAddress: {type: String, required: true,},
        billingEmail: {type: String, required: true}
      }
    ],  
    imageUrl:{
      type: String,
      default: "https://res.cloudinary.com/dhgfid3ej/image/upload/v1558806705/asdsadsa_iysw1l.jpg"
    },
    isAvailable:{
      type: Boolean,
      default: true,
    },
    takeOrder: {
      type: Boolean,
      default: true,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
