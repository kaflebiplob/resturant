"use client";

import React, { useState } from "react";
import Login from "../_components/login";
import Signup from "../_components/signup";

const Resturant = () => {
    const [login, setLogin] = useState(true);
    function btnHandler(){
        setLogin(!login)
    }
  return (
    <>
    <div>
        
      <h1 className="heading-lS">
        {
            login? " Welcome to Login":" Welcome to SignUp"
        }
     </h1>
      {login ? <Login /> : <Signup />}
      <div className="btnclass">
        <button onClick={btnHandler} className="btn-ls">
          {
              login?"Do not have account? SignUp":" Already have account?Login"
            }
         
        </button>
      </div>
            </div>
    </>
  );
};

export default Resturant;
