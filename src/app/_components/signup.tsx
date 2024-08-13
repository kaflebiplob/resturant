import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
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

      if (!name || !email || !password || !city || !contactNumber) {
        setError(true);
      } else {
        setError(false);
      }
      let response = await fetch(`http://localhost:3000/api/resturants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, city, contactNumber }),
      });
      response = await response.json();
      if (response.success) {
        alert("Restruant registered succesfully");
        const { result } = response;
        delete result.password;
        localStorage.setItem("resturantUser", JSON.stringify(result));
        router.push("/resturant");
      }

      console.log("response recieved:", response);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <label htmlFor="">Enter Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {error && !name && (
          <span className="input-error">Please enter the name</span>
        )}
        <label htmlFor="">Enter emai addresss</label>
        <input
          type="text"
          placeholder="Enter your  email.."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {error && !email && (
          <span className="input-error">Please enter the email</span>
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
        {error && !city && (
          <span className="input-error">Please enter the City name.</span>
        )}

        <label htmlFor="contact" className="signup-label">
          Enter Contact Number
        </label>
        <input
          type="number"
          id="contact"
          className="signup-input"
          placeholder="Enter your contact number"
          value={contactNumber}
          onChange={(event) => setContactNumber(event.target.value)}
        />
        {error && !contactNumber && (
          <span className="input-error">Please enter your Contact Number.</span>
        )}

        <button onClick={handleOnClick}>SignUp</button>
      </div>
    </div>
  );
};

export default Signup;
