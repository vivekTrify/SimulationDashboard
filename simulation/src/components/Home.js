import React, { useState, useEffect } from "react";
import "./Home.css";
import SideCard from "./dashboard/SideCard/SideCard";
import { useDropdown } from "../context/DropdownContext";
import SwapStation from "./Pages/SwapStation";
import Vehicle from "./Pages/Vehicle"
import Journey from "./Pages/Journey";
import Locations from "./Pages/Locations";
import { MarkerProvider } from "../context/MarkerContext";
import BottomCard from "./dashboard/BottomCard/BottomCard";
import JourneyProvider from "../context/JourneyContext";


const Home = () => {

  const { selectedOption } = useDropdown();
  const [clickData, setClickData] = useState();
  console.log(clickData);
 
  const handleClickDataChange = (value) => {
    setClickData(value);
  };

  return (
    <div>
      <MarkerProvider>
        <JourneyProvider>
      <div className="mapPage">
        {selectedOption === null && <Locations selectedOption={selectedOption} />}
        {selectedOption === "SwapStation" && <SwapStation selectedOption={selectedOption} />}
        {selectedOption === "Vehicle" && <Vehicle click={handleClickDataChange}  selectedOption={selectedOption} />}
        {selectedOption === "Journey" && <Journey  selectedOption={selectedOption} />}
        {selectedOption === "Locations" && <Locations  selectedOption={selectedOption} />}
      </div>
      <div className="dataPage">
              <SideCard  click={handleClickDataChange} clickData={clickData}/>
      </div>
      <div className="cardPage">
            <BottomCard click={handleClickDataChange} clickData={clickData}/>
      </div>
      </JourneyProvider>
      </MarkerProvider>
    </div>
  );
};

export default Home;
