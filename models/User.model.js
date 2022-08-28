const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,  // -> Ideally, should be unique, but its up to you
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
      type:String, 
      required: true
    },
    role: {
      type:String,
      enum: ['Admin', 'Client', 'Employee'],
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
    address: {
      type: String,
      minLenght: 1,
    },
    city: {
      type: String,
      minLenght: 1,
    },
    state: {
      type: String,
      minLenght: 1,
    },
    zipCode: {
      type: Number,
      minLenght: 1,
    },
    shippingCard: {
      billingAddress: {
        type: String,
        minLenght: 1,
      },
      billingCity: {
        type: String,
        minLenght: 1,
      },
      billingState: {
        type: String,
        minLenght: 1,
      },
      billingZipCode: {
        type: Number,
        minLenght: 1,
      },
      billingPhoneNumber: {
        type: Number,
        minLenght: 1,
      },
      billingEmail: {
        type: String,
        minLenght: 1,
      },
      billingCreditCard: {
        type: Number,
        minLenght: 1,
      },
      billingExpirationDate: {
        type: String,
        minLenght: 1,
      },
      billingCVV: {
        type: Number,
        minLenght: 1,
      },
      billingName: {
        type: String,
        minLenght: 1,
      },
    },
    shippingInfo:{
      shippingAddress: {
        type: String,
        minLenght: 1,
      },
      shippingCity: {
        type: String,
        minLenght: 1,
      },
      shippingState: {
        type: String,
        minLenght: 1,
      },
      shippingZipCode: {
        type: Number,
        minLenght: 1,
      },
      shippingPhoneNumber: {
        type: Number,
        minLenght: 1,
      },
      shippingEmail: {
        type: String,
        minLenght: 1,
      },
    },
    imageUrl:{
      type: String,
      default: "https://res.cloudinary.com/dhgfid3ej/image/upload/v1558806705/asdsadsa_iysw1l.jpg"
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
