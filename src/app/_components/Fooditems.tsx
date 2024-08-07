
import React, { useState } from "react";
interface RestaurantUser {
  _id: string;
  
  // add other fields as needed
}

const Fooditems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");

  const handleBtn = async () => {
    console.log(name, price, path, description);
    let restro_id;
    const resturantData: RestaurantUser | null = JSON.parse(
      localStorage.getItem("resturantUser") || "null"
    );
    // const resturantData = JSON.parse(localStorage.getItem("resturantUser"));
    if (resturantData) {
      restro_id = resturantData._id;
    }
    try {
      let response = await fetch("http://localhost:3000/api/resturants/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          // imagePath: path,
          // description,
          restro_id,
        }),
      });
      response = await response.json();
      if (response.success) {
        alert("all done");
      }
    } catch (error) {
      console.log("errro", error);
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <label htmlFor="">Enter food name</label>
        <input
          type="text"
          placeholder="Enter food name "
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="">Enter Price</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="enter price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <label htmlFor="confirm-password" className="signup-label">
          Enter image path
        </label>
        <input
          type="text"
          id="confirm-password"
          className="signup-input"
          placeholder="enter image path"
          value={path}
          onChange={(event) => setPath(event.target.value)}
        />

        <label htmlFor="city" className="signup-label">
          Enter description
        </label>
        <input
          type="text"
          id="city"
          className="signup-input"
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button onClick={handleBtn}>SignUp</button>
      </div>
    </div>
  );
};

export default Fooditems;
