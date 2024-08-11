import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface FoodItem {
  name: string;
  price: String;
  path: string;
  description: string;
  _id:string
}

// Define the type for the response from the API
interface ApiResponse {
  success: boolean;
  result: FoodItem[];
}

const DashboardFooditem: React.FC = () => {
  const router= useRouter();
 
  
  const [foodItems, setFoodItems] = useState<FoodItem[] | undefined>(undefined);
  useEffect(() => {
    loadFooditems();
  }, []);

  const loadFooditems = async () => {
    const resturantData = JSON.parse(localStorage.getItem("resturantUser"));
    let restro_id = resturantData._id;
    console.log(resturantData._id);
    const response = await fetch(
      `http://localhost:3000/api/resturants/foods/${restro_id}`
    );
    const data: ApiResponse = await response.json();
    // console.log(data);

    // response = await response.json();
    if (data.success) {
      setFoodItems(data.result);
      return;
    } else {
      alert("food item is not added");
    }
  };
  const deleteFoods = async (id:string) => {
  let  response = await fetch(
        `http://localhost:3000/api/resturants/foods/${id}`,
        {
          method: "DELETE",
        }
      );
  response = await response.json();

    if (response.success) {
      loadFooditems();
     
    } else {
      alert("food item not deleted");
    } 
    
  };

  return (
    <div>
      <h1 className="dashboardHeader">This is Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Description</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {foodItems?.map((item, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <img src={item.path}  style={{ height: 'auto', width:'100px' }}/>
              </td>
              <td>{item.description}</td>
              <td>
                <button className="dashboardButton"  onClick={()=>router.push(`/resturant/dashboard/${item._id}`)}>Edit</button>
                <button className="dashboardButton"  onClick={()=>deleteFoods(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardFooditem;
