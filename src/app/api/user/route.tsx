import { ConnectionURL } from "@/app/lib/db"
import { userModel } from "@/app/lib/userModel"
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"

 

export const POST =async (request:NextRequest)=>{
    const payload = await request.json()
    await mongoose.connect(ConnectionURL)
    let success =false
    const user =new userModel(payload)
    const result = await user.save()
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}
