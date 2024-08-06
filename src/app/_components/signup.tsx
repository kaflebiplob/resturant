// "use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [city, setCity] = useState("");
  const router = useRouter();
  const handleOnClick = async () => {
    // console.log(email, password, city);
    try {
      let response = await fetch(`http://localhost:3000/api/resturants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, city }),
      });
      response = await response.json();
      if (response.success) {
        alert("Restruant registered succesfully");
        const { success } = response;
        delete success.password;
        localStorage.setItem("resturantUser", JSON.stringify(success));
      router.push("/resturant/dashboard")
      }

      console.log("response recieved:", response);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <label htmlFor="">Enter emai addresss</label>
        <input
          type="text"
          placeholder="Enter your  email.."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="">Enter password</label>
        <input
          type="password"
          name=""
          id=""
          placeholder="enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="confirm-password" className="signup-label">
          Confirm password
        </label>
        <input
          type="password"
          id="confirm-password"
          className="signup-input"
          placeholder="Confirm your password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />

        <label htmlFor="city" className="signup-label">
          Enter city name
        </label>
        <input
          type="text"
          id="city"
          className="signup-input"
          placeholder="Enter your city..."
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />

        <button onClick={handleOnClick}>SignUp</button>
      </div>
    </div>
  );
};

export default Signup;
