"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import React, { useEffect, useState } from "react";

const ResDetails = (props) => {
  const name = props.params.name;
  const [resturantDetails, setResturantDetails] = useState("");
  const [foodItems, setFoodItems] = useState([]);

  const loadFoodItems = async () => {
    const id = props.searchParams.id;

    if (!id) {
      console.error("ID is not provided");
      return;
    }
    const url = `http://localhost:3000/api/customer/${id}`;
    let response = await fetch(url);
    response = await response.json();
    console.log(response);
    if (response.success) {
      setResturantDetails(response.details);
      setFoodItems(response.foodDetails);
      console.log(response.foodDetails);
    }
  };
  useEffect(() => {
    loadFoodItems();
  }, []);
  return (
    <div>
      <CustomerHeader />
      <div className="details-wrapper">
        <h1> {resturantDetails?.name}</h1>
        <h4>City: {resturantDetails?.city}</h4>
        <h4>{resturantDetails?.address}</h4>
        <h4>Email: {resturantDetails?.email}</h4>
      </div>
      <div>
        {foodItems && foodItems.length > 0 ? (
          foodItems.map((item, index) => (
            <div key={index} className="food-item">
              <div>
                <img src={item.path} style={{ width: "100px" }} alt="" />
              </div>
              <div>Name:{item.name}</div>
              <div>Price:{item.price}</div>
              <div>Details:{item.description}</div>
              <button>Add to cart</button>
            </div>
          ))
        ) : (
          <p>No food items found</p>
        )}
      </div>
    </div>
  );
};

export default ResDetails;
