import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapPath from '../map/MapPath';
import { useJourney } from '../../context/JourneyContext';

function Journey({clickData}) {
  const {  getJourney } = useJourney();
  // const fromVehicleID = clickData?.fromVehicleID ? clickData.fromVehicleID : false;
  // clickData = {};

  const [journeys, setJourneys]= useState([]);
  const journeyData = getJourney;
  console.log(journeyData);

  useEffect(()=>{

    setJourneys(journeyData?journeyData:[]);
  },[journeyData])

  
  console.log(journeys)
  
 
  
  
  


   
  return (
   <>
        {/* {fromVehicleID ? <MapPath journeys={journeys} />  : <MapPath journeys={journeys} />} */}
        <MapPath journeys={journeys} />
   </>



          
        


        
        
  )
}

export default Journey
