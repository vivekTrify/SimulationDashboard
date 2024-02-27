import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapPath from '../map/MapPath';
import { useJourney } from '../../context/JourneyContext';

function Journey({}) {

  const { journeyDates, dateJourneyCounts } = useJourney();
  console.log(journeyDates);
  console.log(dateJourneyCounts);

    // const [data, setData] = useState([]);
    // const Journey_URL = 'http://dev-api.trify.us/api/admin/vehicle_journey/';
    // const  params = {
    //     "start_date": "2023-01-01",
    //     "end_date": "2025-12-31",
    //     "step": "5",
    //     "vehicle_id": "1",
    // }

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         // const response = await axios.get(Journey_URL, { params });
    //         const response = await axios.get("https://dev-api.trify.us/api/rider/vehicle_journeys/1/");
    //         const getData = response.data; // No need to parse JSON if response.data is already parsed
    //         setData(getData);
    //         console.log(getData); // Log the fetched data, not the state variable 'data'
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     };
      
    //     fetchData();
    //   }, []);

      // const journeyData = data;

      // const journeys = Object.entries(journeyData).map(([key, waypoints]) => ({
      //   color: '#' + Math.floor(Math.random()*16777215).toString(16), // Generate random color
      //   waypoints: waypoints.map(({ lat, long }) => ({ lat, lng: long }))
      // }));

  return (
   
<>

<ul>
  {
journeyDates.map((date)=>
<li>
{date}----- total Journey: {dateJourneyCounts[date].length}
</li>


)
  }

</ul>
          
        
</>

        
        
  )
}

export default Journey
