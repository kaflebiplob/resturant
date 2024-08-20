"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import UserSignup from "../_components/userSignup";
import UserLogin from "../_components/userLogin";

const UserAuth = (props: { searchParams: any; }) => {
  const [login, setLogin] = useState(true);
  console.log(props)
  return (
    <div>
      <CustomerHeader />
      <div>
        {login ? <UserLogin redirect={props.searchParams} /> : <UserSignup   redirect={props.searchParams}/>}

        <button className="signup-button" onClick={()=>setLogin(!login)}>
          {login 
            ? "Do not have account? Signup"
            : "Already have account? Login"}
        </button>
      </div>
    </div>
  );
};

export default UserAuth;
