import Link from 'next/link'
import React from 'react'
import "./resturantheader.css";

const CustomerHeader = () => {
  return (
    <div className='cafe-wrapper'>
      <div className="logo">
        BCafe
      </div>
      <nav className="links">

      <ul>
        <li>
            <Link href={"/"}>Login</Link>
        </li>
        <li>
            <Link href={"/"}>Signup</Link>
        </li>
        <li>
            <Link href={"/"}>Cart(0)</Link>
        </li>
        <li>
            <Link href={"/"}>Add Resturant</Link>
        </li>
      </ul>
      </nav>
    </div>
  )
}

export default CustomerHeader
