import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);
  const [passowrdError, setPasswordError] = useState(false);
  const router = useRouter();

  const handleOnClick = async () => {
    // console.log(email, password, city);

    try {
      if (password !== newPassword) {
        setPasswordError(true);

        return false;
      } else {
        setPasswordError(false);
      }

      if(!email || !password ||!city){
        setError(true)
      }
      else{
        setError(false)
      }
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
        router.push("/resturant/dashboard");
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
         {error  && !email && (
          <span className="input-error">
            Please enter the email
          </span>
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
        {passowrdError && (
          <span className="input-error">
            password and new password doesnot match.
          </span>
        )}

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
           {error  && !city && (
          <span className="input-error">
            Please enter the City name.
          </span>
        )}

        <button onClick={handleOnClick}>SignUp</button>
      </div>
    </div>
  );
};

export default Signup;
