import { ConnectionURL } from "@/app/lib/db";
import foodModel from "@/app/lib/foodsModel";
import { Resturant } from "@/app/lib/resturantsModel";
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
  // let result;
  let success=false;
  let payload = await request.json();
  
  await mongoose.connect(ConnectionURL);
  const { restro_id } = payload;
   if (!mongoose.Types.ObjectId.isValid(restro_id)) {
    console.log("invalid restro_id:",restro_id)
      return NextResponse.json({ result: false, message: "Invalid restro_id" });
    }
    

  const foods = new foodModel(payload);
  const result = await foods.save();  
  if(result){
    success= true
  }
  return NextResponse.json({ result, success });
}



// export async function POST(request: Request) {
//   let success = false;
//   let result;

//   try {
//     // Connect to MongoDB
//     await mongoose.connect(ConnectionURL);
    
//     // Parse the request payload
//     const payload = await request.json();
//     console.log("Payload received:", payload);

//     const { name, price, path, description, restro_id } = payload;

//     // Check if all required fields are provided
//     if (!name || !price || !path || !description ) {
//       return NextResponse.json({
//         result: false,
//         message: "Missing required fields",
//       }, { status: 400 });
//     }

//     // Validate restro_id
//     if (!mongoose.Types.ObjectId.isValid(restro_id)) {
//       console.log("Invalid restro_id:", restro_id);
//       return NextResponse.json({
//         result: false,
//         message: "Invalid restro_id",
//       }, { status: 400 });
//     }

//     // Check if the restaurant with the provided restro_id exists
//     const resturant = await Resturant.findById(restro_id);
//     if (!resturant) {
//       console.log("No restaurant found with restro_id:", restro_id);
//       return NextResponse.json({
//         result: false,
//         message: "Invalid restro_id",
//       }, { status: 400 });
//     }

//     // Create and save the new food item
//     const foodItem = new foodModel({
//       name,
//       price,
//       path,
//       description,
//       restro_id,
//     });

//     result = await foodItem.save();
//     success = true;
//     console.log("Food item saved successfully:", result);

//   } catch (error) {
//     console.error("Error saving food item:", error);
//     return NextResponse.json({
//       result: false,
//       message: 'Error saving food item',
//     }, { status: 500 });
//   }

//   return NextResponse.json({ result, success });
// }

