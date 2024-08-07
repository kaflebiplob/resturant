import { tree } from "next/dist/build/templates/app-page";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleError = async () => {
    if (!email || !password) {
      setError(true);
    } else {
      setError(false);
    }

    let response =await fetch(`http://localhost:3000/api/resturants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    response = await response.json()
    
    if(response.success){
      alert("You logged in succesfully")
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
        {error && !email && (
          <span className="input-error">Please enter email.</span>
        )}
        <label htmlFor="">Enter password</label>
        <input
          type="password"
          name=""
          id=""
          placeholder="enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && !password && (
          <span className="input-error">Please enter password.</span>
        )}
        <button onClick={handleError}> Login</button>
      </div>
    </div>
  );
};

export default Login;
