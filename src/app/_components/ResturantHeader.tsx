"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./resturantheader.css";
import { useRouter, usePathname } from "next/navigation";

const ResturantHeader: React.FC = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let data = localStorage.getItem("resturantUser");
    if (data) {
      setDetails(JSON.parse(data));
    }
    if (!data && pathname === "/resturant/dashboard") {
      router.push("/resturant");
    } else if (data && pathname === "/resturant") {
      router.push("/resturant/dashboard");
    }
  }, []);
  function handleLogout() {
    localStorage.removeItem("resturantUser");
    router.push("/resturant");
  }
  return (
    <div className="cafe-wrapper">
      <div className="logo">BCafe</div>
      <nav className="links">
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          {details ? (
            <>
              <button className="logoutbutton" onClick={handleLogout}>
                Logout
              </button>
              <li>
                <Link href={"/"}>Profile</Link>
              </li>{" "}
            </>
          ) : (
            <li>
              <Link href={"/"}>login/signup</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default ResturantHeader;
