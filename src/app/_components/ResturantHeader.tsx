import React from 'react'
import Link from 'next/link'
import "./resturantheader.css"

const ResturantHeader:React.FC = () => {
  return (
    <div className='cafe-wrapper'>
      <div className="logo">
        BCafe
      </div>
      <nav className="links">
        <ul>
            <li>
            <Link href={"/"}>Home</Link>
            </li>
            <li>
            <Link href={"/"}>Login/SignUp</Link>
            </li>
            <li>
            <Link href={"/"}>Profile</Link>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default ResturantHeader
