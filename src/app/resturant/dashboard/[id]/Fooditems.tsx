"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Fooditems = (props) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  useEffect(()=>{
    upadateEidtInfo();
  },[]);


  
  async function upadateEidtInfo() {

    let response = await fetch(
      `http://localhost:3000/api/resturants/foods/edit/${props.params.id}`
    );
    let data = await response.json();

    console.log("API Response:", data);

    if (response.ok && data.success) {
      const foodItem = data.result[0];
      console.log("Setting State:", foodItem);
      setName(foodItem.name);
      setPrice(foodItem.price);
      setPath(foodItem.path);
      setDescription(foodItem.description);
    }
  }
  const handleBtn = async () => {
    console.log(name, price, path, description);
    if (!name || !price || !path || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch(`http://localhost:3000/api/resturants/foods/edit/${props.params.id}`,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name,price,path,description})
    })
    const data  = await response.json()
    if(response.ok && data.success){
      router.push(`/resturant/dashboard`)

    }else{
      alert("data is not updated")
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <label htmlFor="">Edit food item</label>
        <input
          type="text"
          placeholder="Enter food name "
          value={name}
          onChange={(event) => setName(event.target.value)} />
        {error && !name && (
          <span className="input-error">Please input name</span>
        )}

        <label htmlFor="">Enter Price</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="enter price"
          value={price}
          onChange={(event) => setPrice(event.target.value)} />
        {error && !price && (
          <span className="input-error">Please input price</span>
        )}
        <label htmlFor="confirm-password" className="signup-label">
          Enter image path
        </label>
        <input
          type="text"
          id="confirm-password"
          className="signup-input"
          placeholder="enter image path"
          value={path}
          onChange={(event) => setPath(event.target.value)} />
        {error && !path && (
          <span className="input-error">Please input Path</span>
        )}
        <label htmlFor="city" className="signup-label">
          Enter description
        </label>
        <input
          type="text"
          id="city"
          className="signup-input"
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.target.value)} />
        {error && !description && (
          <span className="input-error">Please input description</span>
        )}
        <button onClick={handleBtn}>Update</button>
        <button
          style={{ marginTop: "10px" }}
          onClick={() => router.push(`/resturant/dashboard`)}
        >
          Back to foodItems
        </button>
      </div>
    </div>
  );
};
