"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGE, TAX } from "../lib/constants";
import { useRouter } from "next/navigation";

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
  const[removeCartData,setRemoveCartData]=useState(false)
  const router = useRouter();

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
    let deliveryBoy_id = "66c49e61fbc7c28f9aad8ddb";
    let collection = {
      user_id,
      restro_id,
      foodItems,
      deliveryBoy_id,
      status: "confirm",
      amount: total,
    };
    let response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collection),
    });
    response = await response.json();
    if (response.success) {
      alert("order done")
      setRemoveCartData(true)
      router.push("/myprofile")
    } else {
      alert("you are going bad");
    }
    
  };

  return (
    <div>
      <CustomerHeader removeCartData={removeCartData} />

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
