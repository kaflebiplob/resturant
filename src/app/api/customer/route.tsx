import { ConnectionURL } from "@/app/lib/db";
import { Resturant } from "@/app/lib/resturantsModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  let queryParams = request.nextUrl.searchParams;
  console.log(queryParams);
  let filter = {};
  if (queryParams.get("location")) {
    let city = queryParams.get("location");
    filter = { city: { $regex: new RegExp(city, "i") } };
  } else if (queryParams.get("resturant")) {
    let name = queryParams.get("resturant");
    filter = { name: { $regex: new RegExp(name, "i") } };
  }
  await mongoose.connect(ConnectionURL);
  let result = await Resturant.find(filter);
  return NextResponse.json({ success:true, result });
};

// export const GET=async(request:NextRequest)=>{
//     let queryParams =request.nextUrl.searchParams;
//     console.log(queryParams)
//     await mongoose.connect(ConnectionURL)
//     return NextResponse.json({success:true})
// }