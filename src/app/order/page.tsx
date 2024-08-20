"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGE, TAX } from "../lib/constants";

const Orderpage = () => {
  const [userStorage, setUserStorage] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [total, setTotal] = useState(() =>
    cartStorage.length === 1
      ? cartStorage[0].price
      : cartStorage.reduce((a, b) => a + b.price, 0)
  );

  useEffect(() => {
    if (cartStorage.length > 0) {
      const calculatedTotal = cartStorage.reduce((accumulator, item) => {
        const itemPrice = parseFloat(item.price.replace("Rs", "").trim());
        return accumulator + itemPrice;
      }, 0);
      setTotal(calculatedTotal);
    }
  }, [cartStorage]);
  const handleOrder = async () => {
    let user_id = JSON.parse(localStorage.getItem("user"))._id;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let foodItems = cart.map((item) => item._id).toString();
    let restro_id = cart[0].restro_id;
    let delivery_boy = "66c49e61fbc7c28f9aad8ddb";
    let collection = {
      user_id,
      restro_id,
      foodItems,
      delivery_boy,
      status: "confirm",
      amount: total,
    };
    let response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      body: JSON.stringify(collection),
    });
    response = await response.json();
    if (response.success) {
      alert("YOu are going good");
    } else {
      alert("you are going bad");
    }
    console.log(collection);
  };

  return (
    <div>
      <CustomerHeader />

      <div className="price-calculation">
        <div className="price-row">
          <span className="price-label">Food Charges:</span>
          <span className="price-value">{total}</span>
        </div>
        <div className="price-row">
          <span className="price-label">Tax:</span>
          <span className="price-value">{(total * TAX) / 100}</span>
        </div>
        <div className="price-row">
          <span className="price-label">Delivery Charges:</span>
          <span className="price-value">{DELIVERY_CHARGE}</span>
        </div>
        <div className="price-row">
          <span className="price-label">Total Amount:</span>
          <span className="price-value">
            {total + (total * TAX) / 100 + DELIVERY_CHARGE}
          </span>
        </div>
      </div>
      <button onClick={handleOrder}>Order now</button>
    </div>
  );
};

export default Orderpage;
