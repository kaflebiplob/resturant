const {default:mongoose} = require("mongoose");

const foodsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },

  restro_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
    
    },
});

export const foodModel = mongoose.models.foods || mongoose.model("foods", foodsSchema);
