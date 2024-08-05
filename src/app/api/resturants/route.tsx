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
