import { ConnectionURL } from "@/app/lib/db";
import foodModel from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
interface Content {
    params: {
        id: string; 
    };
 
}

export async function GET(request:NextRequest,content:Content){
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    console.log(id)
    let success = false;
    await mongoose.connect(ConnectionURL)
    const result = await foodModel.find({}).exec()
    console.log(result)
    if(result){
        success= true
    }

    return NextResponse.json({result, success})
}

export async function DELETE(request:NextRequest){
  
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
  
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("Invalid ID format:", id);
        
    }
    let success= false;
    await mongoose.connect(ConnectionURL);
     const result = await foodModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) }).exec()
    if(result.deletedCount>0){
        success= true;
    

    }
    return NextResponse.json({result, success})

}