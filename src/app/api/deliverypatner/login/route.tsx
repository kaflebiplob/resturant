import { ConnectionURL } from "@/app/lib/db";
import { deliveryModel } from "@/app/lib/deliverypatner";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  let success = false;
  await mongoose.connect(ConnectionURL);
  const result = await deliveryModel.findOne({
    mobile: payload.mobile,
    pasword: payload.password,
  });   
  if(result){
    success=true
  }
  return NextResponse.json({ success, result});
}
