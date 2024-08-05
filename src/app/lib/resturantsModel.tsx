const mongoose = require("mongoose");


const resturantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
      
  },

});


export const Resturant =
   mongoose.model("bipdbs", resturantSchema);
