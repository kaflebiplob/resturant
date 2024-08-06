import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ConnectionURL } from "@/app/lib/db";
import { Resturant } from "@/app/lib/resturantsModel";

export async function GET() {
  try {
    await mongoose.connect(ConnectionURL);
    console.log("Connected successfully to MongoDB");

    const data = await Resturant.find();
    console.log(data);

    return NextResponse.json({ result: true, data });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    return NextResponse.json({ result: false });
  }
}

export async function POST(request: Request) {
let payload = await request.json();
await mongoose.connect(ConnectionURL)
console.log("connected to Post MongoDb")
const { email, password } = payload;
if (!email || !password) {
  return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  
}
const restaurants = new Resturant(payload);
const result = await restaurants.save();
console.log("Restaurant saved:", result)

  return NextResponse.json({ success: payload });

}

