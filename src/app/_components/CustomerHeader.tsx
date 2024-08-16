import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./resturantheader.css";
import { json } from "stream/consumers";

const CustomerHeader = (props) => {
  // console.log("props:",props)
  const cartStorage = JSON.parse(localStorage.getItem("cart"));
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);

  useEffect(() => {
    if (props.cartData) {
      if (cartNumber) {
        if (cartItem[0].restro_id != props.cartData.restro_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
        } else {
          let localCartItem = cartItem;
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1);

          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([props.cartData]);
        localStorage.setItem("cart", JSON.stringify([props.cartData]));
      }
    }
  }, [props.cartData]);
  useEffect(() => {
    if (props.removeCartData) {
      let localcartItem = cartItem.filter((item) => {
        return item._id != props.removeCartData;
      });
      setCartItem(localcartItem);
      setCartNumber(cartNumber-1)
      localStorage.setItem("cart",JSON.stringify(localcartItem))
      if(localcartItem.length==0){
        localStorage.removeItem("cart")
      }
    }
  }, [props.removeCartData]);
  return (
    <div className="cafe-wrapper">
      <div className="logo">BCafe</div>
      <nav className="links">
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/"}>Login</Link>
          </li>
          <li>
            <Link href={"/"}>Signup</Link>
          </li>
          <li>
            <Link href={cartNumber?"/cart":"#"}>Cart({cartNumber})</Link>
          </li>
          <li>
            <Link href={"/"}>Add Resturant</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CustomerHeader;
