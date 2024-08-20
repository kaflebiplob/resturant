
const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    foodItems:String,
    restro_id:mongoose.Schema.Types.ObjectId,
    deliveryBoy_id:mongoose.Schema.Types.ObjectId,
    status:String,
    amount:String,

})

export const orderModel = mongoose.models.orders|| mongoose.model("orders",orderSchema) 