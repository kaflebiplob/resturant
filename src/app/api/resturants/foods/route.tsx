import { ConnectionURL } from "@/app/lib/db";
import foodModel from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await mongoose.connect(ConnectionURL);
    console.log("Connected successfully to MongoDB");

    const data = await foodModel.find();
    console.log(data);

    return NextResponse.json({ result: true, data });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    return NextResponse.json({ result: false });
  }
}

export async function POST(request: Request) {
  let result;
  let payload = await request.json();
  
  await mongoose.connect(ConnectionURL);
  const { restro_id } = payload;
   if (!mongoose.Types.ObjectId.isValid(restro_id)) {
      return NextResponse.json({ result: false, message: "Invalid restro_id" });
    }

  const foods = new foodModel(payload);
  result = await foods.save();  
  return NextResponse.json({ result, success: payload });
}
