import { ConnectionURL } from "@/app/lib/db";
import { orderModel } from "@/app/lib/orders";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(requqest:NextRequest) {
    const payload = await requqest.json()
    let success=false
    const ordersObj = new orderModel(payload)
    const result = await ordersObj.save();
    console.log(ordersObj)
    await mongoose.connect(ConnectionURL)
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
    
}