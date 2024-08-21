"use client";
import React, { useState } from "react";

const deliverypatner = () => {
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const handleDelivery = async () => {
    let response = await fetch(
      `http://localhost:3000/api/deliverypatner/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mobile,
          password,
          city,
          address,
        }),
      }
    );
    response = await response.json();
    console.log(response);
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
    } else {
      alert("false");
    }
  };
  const handleLogin = async () => {
    let response = await fetch(
      `http://localhost:3000/api/deliverypatner/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
          password,
        }),
      }
    );
    response = await response.json();
    console.log(response);
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("delivery", JSON.stringify(result));
    }

    return (
      <div>
        <div>
          <h1>Delivery Partner</h1>
          <div className="auth-container">
            <div className="login-wrapper">
              <h3>Login</h3>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="enter mobile"
                  value={loginMobile}
                  onChange={(event) => setLoginMobile(event.target.value)}
                  className="input-field"
                />
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="enter password"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  className="input-field"
                />
              </div>
              <div className="input-wrapper">
                <button className="button" onClick={handleLogin}>Login</button>
              </div>
            </div>
            <div className="signup-wrapper">
              <h3>Signup</h3>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="input-field"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="input-field"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                  placeholder="Enter mobile"
                />
              </div>

              <div className="input-wrapper">
                <input
                  type="text"
                  className="input-field"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                />
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="input-field"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="input-field"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Enter address"
                />
              </div>

              <div className="input-wrapper">
                <button onClick={handleDelivery} className="button">
                  Signup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
export default deliverypatner;
