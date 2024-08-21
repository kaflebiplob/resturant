import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

const UserLogin = (props) => {
  console.log("login", props);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const handleLogin = async () => {
    console.log({
      email,
      password,
    });
    let response = await fetch(`http://localhost:3000/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    response = await response.json();
    console.log(response);
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (props?.redirect?.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("false");
    }
  };

  return (
    <div>
      <div className="signup-container">
        <h2 className="signup-title">Login</h2>
        <div>
          <div className="signup-form-group">
            <label htmlFor="username" className="signup-label">
              email:
            </label>
            <input
              type="text"
              id="username"
              className="signup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signup-form-group">
            <label htmlFor="password" className="signup-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="signup-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
