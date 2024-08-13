"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
interface Location {
  id: number; // Unique identifier for each location
  name: string; // Name of the location
}

export default function Home() {
  // const [locations, setLocations] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);

  const[selectLocation, setSelectLocation]=useState("")
  const[showLocation,setShowLocation]=useState(false)

  const loadLocations = async () => {
    let response = await fetch(`http://localhost:3000/api/customer/locations`);
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };
  function addLocation(item){
   setSelectLocation(item)
   setShowLocation(false)
  }
  
  useEffect(()=>{
    loadLocations();
  },[])
  return (
    <main>
      <CustomerHeader />
      <div className="container">
        <h1 className="header">Food Delivery App.</h1>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="select place"
            className="inputFeild"
            value={selectLocation}
            onClick={()=>setShowLocation(true)}
          />
          <ul className="list">
             {
         showLocation &&  locations.map((item:Location)=>(
              <li onClick={()=>addLocation(item)} className="listItem">{item}</li>
            ))
          }
           </ul>
          <input
            type="text"
            placeholder="Enter a food or a resturant name."
            className="inputFeild"
          />
        </div>
      </div>
    </main>
  );
}
