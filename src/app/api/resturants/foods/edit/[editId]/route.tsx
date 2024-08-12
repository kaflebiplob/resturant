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
    const result = await foodModel.find({_id:id}).exec()
    console.log(result)
    if(result){
        success= true
    }

    return NextResponse.json({result, success})
}

export async function PUT(request:Request, content:Content) {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const _id = pathSegments[pathSegments.length - 1];
    const payload = await request.json()
    let success = false;
    await mongoose.connect(ConnectionURL)
    const result = await foodModel.findByIdAndUpdate(_id,payload)
    if(result){
        success=true
    }
    return NextResponse.json({success, result})
    
}
