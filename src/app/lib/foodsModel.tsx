import mongoose from "mongoose";

const foodsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  restro_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const foodModel = mongoose.models.foods || mongoose.model("foods", foodsSchema);

export default foodModel;
