import React, { useEffect, useState } from "react";
interface FoodItem {
    name: string;
    price: number;
    description: string;
  }
  
  // Define the type for the response from the API
  interface ApiResponse {
    success: boolean;
    result: FoodItem[];
  }

const DashboardFooditem: React.FC = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[] | undefined>(undefined);;
  useEffect(() => {
    loadFooditems();
  }, []);

  const loadFooditems = async () => {
    const resturantData = JSON.parse(localStorage.getItem("resturantUser"))
    let restro_id=resturantData._id
    console.log(resturantData._id)
    let response = await fetch(
      `http://localhost:3000/api/resturants/foods/${restro_id}`
    );
    const data: ApiResponse = await response.json();

    // response = await response.json();
    if (data.success) {
      setFoodItems(data.result);
    } else {
      alert("foof item is not added");
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
            <th>Description</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {foodItems?.map((item, key) => (
            <tr key={key}>
              <td>{key+1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <button className="dashboardButton">Edit</button>
                <button className="dashboardButton">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardFooditem;
