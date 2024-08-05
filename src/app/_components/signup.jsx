import React from 'react'

const Signup = () => {
  return (
    <div className='login-container'>
      <div className='login-form'>

      <label htmlFor="">Enter emai addresss</label>
      <input type="text" placeholder='Enter your  email..' />
      <label htmlFor="">Enter password</label>
      <input type="password" name="" id="" placeholder='enter password' />
      <label htmlFor="confirm-password" className="signup-label">Confirm password</label>
        <input type="password" id="confirm-password" className="signup-input" placeholder="Confirm your password" />


      <label htmlFor="city" className="signup-label">Enter city name</label>
        <input type="text" id="city" className="signup-input" placeholder="Enter your city..." />

      <button >SignUp</button>
      
      </div>
    </div>
  )
}

export default Signup
