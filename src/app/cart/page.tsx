"use client";
import React, { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGE, TAX } from "../lib/constants";
import { useRouter } from "next/navigation";

const Cartpage = () => {
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const router = useRouter();

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
  function orderNow() {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/userauth?order=true");
    }
  }

  return (
    <div>
      <CustomerHeader />

      <div>
        {cartStorage.length > 0 ? (
          cartStorage.map((item, index) => (
            <div key={index} className="food-item">
              <div>
                <img src={item.path} style={{ width: "100px" }} alt="" />
              </div>
              <div>Name: {item.name}</div>
              <div>Price: {item.price}</div>
              <div>Details: {item.description}</div>
              {/* <button>Remove from cart</button>  */}
            </div>
          ))
        ) : (
          <p>No food items found</p>
        )}
      </div>

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
      <button onClick={orderNow}>Order now</button>
    </div>
  );
};

export default Cartpage;
