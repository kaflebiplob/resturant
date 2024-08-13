"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import { useRouter } from "next/navigation";
interface Location {
  id: number; // Unique identifier for each location
  name: string; // Name of the location
}

export default function Home() {
  // const [locations, setLocations] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);

  const [selectLocation, setSelectLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [resturant, setResturant] = useState([]);
  const router = useRouter();

  const loadLocations = async () => {
    let response = await fetch(`http://localhost:3000/api/customer/locations`);
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };
  const loadResturants = async (params) => {
    let url = `http://localhost:3000/api/customer`;
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.resturant) {
      url = url + "?resturant="+params.location;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setResturant(response.result);
    }
  };
  function addLocation(item) {
    setSelectLocation(item);
    setShowLocation(false);
    loadResturants({ location: item });
  }
  useEffect(() => {
    loadLocations();
    loadResturants();
  }, []);

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
            onClick={() => setShowLocation(true)}
          />
          <ul className="list">
            {showLocation &&
              locations.map((item: Location) => (
                <li onClick={() => addLocation(item)} className="listItem">
                  {item}
                </li>
              ))}
          </ul>
          <input
            type="text"
            placeholder="Enter a food or a resturant name."
            className="inputFeild"
            onChange={(event)=>loadResturants({resturant:event.target.value})}
          />
          <div className="restaurantList">
            {resturant.map((item, index) => (
              <div key={index} className="restaurantCard" onClick={()=>router.push("explore/" + item.name)}>
                <h2 className="restaurantTitle">{item.name}</h2>
                <h6 className="restaurantDetails">{item.city}</h6>
                <h5 className="restaurantDetails">{item.email}</h5>
                <h5 className="restaurantDetails">{item.contact}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
