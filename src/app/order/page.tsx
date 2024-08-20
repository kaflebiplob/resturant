"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import { DELIVERY_CHARGE, TAX } from "../lib/constants";

const Orderpage = () => {
    const[userStorage,setUserStorage]=useState(JSON.parse(localStorage.getItem("user")))
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
          <button>Order now</button>
      </div>
    );
  };
  
  export default Orderpage;
  