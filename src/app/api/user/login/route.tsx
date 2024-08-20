import { ConnectionURL } from "@/app/lib/db";
import { userModel } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  let success = false;
  await mongoose.connect(ConnectionURL);
  const result = await userModel.findOne({
    email: payload.email,
    pasword: payload.password,
  });
  if(result){
    success=true
  }
  return NextResponse.json({ success, result});
}
