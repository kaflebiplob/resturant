import { ConnectionURL } from "@/app/lib/db";
import foodModel from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request:Request,Content){
    const id = Content.params.id;
    console.log(id)
    let success = false;
    await mongoose.connect(ConnectionURL)
    const result = await foodModel.find({restro_id: id})
    if(result){
        success= true
    }

    return NextResponse.json({result, success})
}