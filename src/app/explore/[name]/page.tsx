"use client";
import React, { useEffect, useState } from "react";

const ResDetails = (props) => {
  const name = props.params.name;
  const [resturantDetails, setResturantDetails] = useState("");
  const [foodItems, setFoodItems] = useState("");

  const loadFoodItems = async () => {
    const id = props.searchParams.id;

    if (!id) {
      console.error("ID is not provided");
      return;
    }
    const url = `http://localhost:3000/api/customer/${id}`;
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setResturantDetails(response.details);
      setFoodItems(response.foodItems);
    }
  };
  useEffect(() => {
    loadFoodItems();
  }, []);
  return (
    <div>
      <div>
        this is the details page.
        {decodeURI(name)}
      </div>
      <div className="details-wrapper">
        <h4>Contact : {resturantDetails?.contact}</h4>
        <h4>City:{resturantDetails?.city}</h4>
        <h4>Address:{resturantDetails?.address}</h4>
        <h4>Email:{resturantDetails?.email}</h4>
      </div>
    </div>
  );
};

export default ResDetails;
