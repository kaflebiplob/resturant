import { mongo } from "mongoose"

const mongoose = require("mongoose")
const deliverySchema = new mongoose.Schema({
    name:String,
    mobile:String,
    password:String,
    city:String,
    address:String,
})

export const deliveryModel = mongoose.models.deliverypatners || mongoose.model("deliverypatners",deliverySchema)