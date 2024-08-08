import mongoose from "mongoose";
import React, { useState } from "react";


const Fooditems = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState('');

  const handleBtn = async () => {
    console.log(name, price, path, description);

    // const resturantData = JSON.parse(localStorage.getItem("resturantUser") || "{}");
    const resturantData = JSON.parse(localStorage.getItem("resturantUser"));
    if (!resturantData) {
      setError('No resturantUser data found in local storage.');
      return;
    }

    let restro_id;
    if (resturantData && resturantData._id) {
      restro_id = resturantData._id;
      console.log("restro_id",restro_id)
      console.log("resturantdata:",resturantData)
    } else {
      console.log("resturantUser data is missing or _id is not found");
    }
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
          imagePath: path,
          description,
          restro_id,
        }),
      });
      response = await response.json();
      if (response.success) {
        alert("all done");
      }
    } catch (error) {
      console.log("error", error);
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
        <button onClick={handleBtn}>Add</button>
      </div>
    </div>
  );
};

export default Fooditems


