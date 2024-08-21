"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
interface OrderItem {
  data: {
    name: string;
    amount: string;
  };
  restro_id: string;
  address: string;
  status: string;
}


const Profilepage = () => {
  const [myOrder, setMyOrder] = useState<OrderItem[]>([]);
  const getMyOrder = async () => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
console.log(userStorage)
    let response = await fetch(
      `http://localhost:3000/api/orders?id=${userStorage._id}`);
    response = await response.json();
    console.log(response);
    if (response.success) {
      setMyOrder(response.result);
      console.log(response.result);
    }
  };

  useEffect(() => {
    getMyOrder();
  }, []);


  return (
    <div>
      <CustomerHeader />
      <h1>This is the profile page</h1>
      {myOrder.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        myOrder.map((item, index) => (
          <div key={index}>
            <h1>{item.data.name}</h1>
            <h2>Restaurant ID: {item.restro_id}</h2>
            <h2>Amount: {item.data.amount}</h2>
            <h2>Address: {item.address}</h2>
            <h2>Status: {item.status}</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default Profilepage;
