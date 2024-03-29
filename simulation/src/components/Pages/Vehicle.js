import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../map/Map';




const Vehicle = ({ click, selectedOption,}) => {

  const [markers, setMarkers] = useState([]);
  const [defaultCenter, setDefaultCenter] = useState({ lat: 12.9716, lng: 77.5946 });
  const [defaultZoom, setDefaultZoom] = useState(12);

  
    const generateRandomColor = () => {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      return `rgb(${red},${green},${blue})`;
    };

  useEffect(()=> {
    click(null);
  },[])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dev-api.trify.us/api/admin/vehicles/");
        
        const getData = JSON.parse(response.data);       
        const newMarkers = getData.map((data) => ({ lat: data.fields.home_latitude, lng: data.fields.home_longitude, color: generateRandomColor(), name: `Vehicle${data.pk}`, id:data.pk}));
        console.log(getData);
        setMarkers(newMarkers);
        const totalMarkers = getData.length;
        const totalLat = getData.reduce((sum, station) => sum + station.fields.home_latitude, 0);
        const totalLng = getData.reduce((sum, station) => sum + station.fields.home_longitude, 0);
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

          <Map center={defaultCenter} zoom={defaultZoom} markers={markers} click={click}/>
       
     
  );
}

export default Vehicle;