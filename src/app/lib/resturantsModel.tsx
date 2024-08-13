const mongoose = require("mongoose");

 const resturantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  contact:{
    type:String,
  }
});

export const Resturant =
  mongoose.models.resturants || mongoose.model("resturants", resturantSchema);
