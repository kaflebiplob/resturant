import React, { useState } from "react";

const UserSignup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [cNumber, setCNumber] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log({
      username,
      email,
      password,
      city,
      cNumber,
      streetAddress,
    });
    let response = await fetch(`http://localhost:3000/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        city,
        cNumber,
        streetAddress,
      }),
    });
    response = await response.json();
    console.log(response);
    if (response.success) {
      alert("success");
    } else {
      alert("false");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      {error && <p className="signup-error">{error}</p>}
      <div>
        <div className="signup-form-group">
          <label htmlFor="username" className="signup-label">Username:</label>
          <input
            type="text"
            id="username"
            className="signup-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="email" className="signup-label">Email:</label>
          <input
            type="email"
            id="email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="password" className="signup-label">Password:</label>
          <input
            type="password"
            id="password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="confirmPassword" className="signup-label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="signup-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="city" className="signup-label">City:</label>
          <input
            type="text"
            id="city"
            className="signup-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="number" className="signup-label">Number:</label>
          <input
            type="text"
            id="number"
            className="signup-input"
            value={cNumber}
            onChange={(e) => setCNumber(e.target.value)}
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="streetAddress" className="signup-label">Street Address:</label>
          <input
            type="text"
            id="streetAddress"
            className="signup-input"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            required
          />
        </div>
        <button className="signup-button" onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
};

export default UserSignup;
