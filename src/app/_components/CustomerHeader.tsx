import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./resturantheader.css";
import { json } from "stream/consumers";
import { isRegExp } from "util/types";
import { useRouter } from "next/navigation";

const CustomerHeader = (props) => {
  // console.log("props:",props)
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const cartStorage = JSON.parse(localStorage.getItem("cart"));
  const [user, setUser] = useState(userStorage ? userStorage : undefined);
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);
  const router = useRouter();

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
      setCartNumber(cartNumber - 1);
      localStorage.setItem("cart", JSON.stringify(localcartItem));
      if (localcartItem.length == 0) {
        localStorage.removeItem("cart");
      }
    }
  }, [props.removeCartData]);
  useEffect(()=>{
if(props.removeCartData){
  setCartItem([]);
  setCartNumber(0)
  localStorage.removeItem("cart")
}
  },[props.removeCartData])

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/userauth");
  };
  
  return (
    <div className="cafe-wrapper">
      <div className="logo">BCafe</div>
      <nav className="links">
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/myprofile" className="">
                  {user?.email}
                </Link>
              </li>
              <li className="logoutbutton" onClick={logout}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={"/"}>Login</Link>
              </li>
              <li>
                <Link href={"/userauth"}>Signup</Link>
              </li>
            </>
          )}
          <li>
            <Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber})</Link>
          </li>
          <li>
            <Link href={"/resturant"}>Add Resturant</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CustomerHeader;
