import { ConnectionURL } from "@/app/lib/db";
import { foodModel } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async(request: Request)=> {
  const payload = await request.json();
  await mongoose.connect(ConnectionURL);

  const foods = new foodModel(payload);
  const result = await foods.save();
  return NextResponse.json({ result, success: true });
}

