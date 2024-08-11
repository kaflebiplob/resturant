"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const Fooditems = (props) => {
    const router = useRouter();
    console.log(props)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
 

  const handleBtn = async () => {
    console.log(name, price, path, description);
    if(!name || !price || !path || !description){
      setError(true)
      return false
    }else{
      setError(false)
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
          onChange={(event) => setName(event.target.value)}
        />
        {
          error && !name &&(
            <span className="input-error">Please input name</span>
          )
        }

        <label htmlFor="">Enter Price</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="enter price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
 {
          error && !price &&(
            <span className="input-error">Please input price</span>
          )
        }
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
 {
          error && !path &&(
            <span className="input-error">Please input  Path</span>
          )
        }
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
         {
          error && !description && (
            <span className="input-error">Please input description</span>
          )
        }
        <button onClick={handleBtn}>Update</button>
        <button style={{marginTop:"10px"}} onClick={()=>router.push(`/resturant/dashboard`)}>Back to foodItems</button>

      </div>
    </div>
  );
};

export default Fooditems


