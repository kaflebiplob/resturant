import { ConnectionURL } from "@/app/lib/db";
import foodModel from "@/app/lib/foodsModel";
import { Resturant } from "@/app/lib/resturantsModel";
import mongoose, { mongo, set } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
  await mongoose.connect(ConnectionURL);
  let result = await Resturant.find();
  result = result.map((item)=>item.city.charAt(0).toUpperCase() + item.city.slice(1))
  result = [...new Set(result)]
  return NextResponse.json({ success: true, result });
};
