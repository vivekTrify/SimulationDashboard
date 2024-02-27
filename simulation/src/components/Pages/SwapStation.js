import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../map/Map';


const SwapStation = ({ selectedOption }) => {

  const [data, setData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [defaultCenter, setDefaultCenter] = useState({ lat: 12.9716, lng: 77.5946 });
  const [defaultZoom, setDefaultZoom] = useState(12);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dev-api.trify.us/api/admin/servicestation/");
        const getData = JSON.parse(response.data);
        setData(getData);
        const newMarkers = getData.map((data) => ({ lat: data.fields.latitude, lng: data.fields.longitude }));
        setMarkers(newMarkers);
        const totalMarkers = getData.length;
        const totalLat = getData.reduce((sum, station) => sum + station.fields.latitude, 0);
        const totalLng = getData.reduce((sum, station) => sum + station.fields.longitude, 0);
        const avgLat = totalLat / totalMarkers;
        const avgLng = totalLng / totalMarkers;
        setDefaultCenter({ lat: avgLat, lng: avgLng });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedOption]);

  return (
    
          <Map center={defaultCenter} zoom={defaultZoom} markers={markers}/>
        
  );
}

export default SwapStation;