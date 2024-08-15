import { ConnectionURL } from "@/app/lib/db"
import foodModel from "@/app/lib/foodsModel"
import { Resturant } from "@/app/lib/resturantsModel"
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"


 export async function GET(request:NextRequest, content){
    const id = content.params.id
    console.log(id)
    await mongoose.connect(ConnectionURL)
    const details = await Resturant.findOne({_id:id})
    const foodDetails = await foodModel.find({restro_id:id})


    return NextResponse.json({success:true, details, foodDetails})
 }