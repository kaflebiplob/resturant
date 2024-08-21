import { ConnectionURL } from "@/app/lib/db";
import { orderModel } from "@/app/lib/orders";
import { Resturant } from "@/app/lib/resturantsModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  let success = false;
  const ordersObj = new orderModel(payload);
  const result = await ordersObj.save();
  console.log(ordersObj);
  await mongoose.connect(ConnectionURL);
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function GET(request: NextResponse) {
    await mongoose.connect(ConnectionURL);
  const userId = await request.nextUrl.searchParams.get("id");
  if (!userId) {
    return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
  }
  let success = false;
  let result = await orderModel.find({ user_id: userId });
  if (result.length>0) {
    success = true;
    let restroData = await Promise.all(
      result.map(async (item) => {
        let restroInfo = {};
        restroInfo.data = await Resturant.findOne({ _id: item.restro_id });
        restroInfo.amount = item.amount;
        restroInfo.status = item.status;
        return restroInfo;
      })
    );
    return NextResponse.json({ result: restroData, success: true });
  }

  return NextResponse.json({ result, success });
}
