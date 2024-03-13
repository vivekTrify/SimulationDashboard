import React, { useState, useEffect } from 'react';
import Map from '../map/Map';
import { useMarkerContext } from '../../context/MarkerContext';

const Locations = ({ click, selectedOption }) => {

  const [defaultCenter, setDefaultCenter] = useState({ lat: 12.9716, lng: 77.5946 });
  const [defaultZoom, setDefaultZoom] = useState(12);

  // Access the marker context
  const { markerData } = useMarkerContext();
  const markers = markerData();

  useEffect(() => {
    // Calculate the center of all markers once markers are set
    if (markers.length > 0) {
      const totalLat = markers.reduce((sum, marker) => sum + marker.lat, 0);
      const totalLng = markers.reduce((sum, marker) => sum + marker.lng, 0);
      const avgLat = totalLat / markers.length;
      const avgLng = totalLng / markers.length;
      setDefaultCenter({ lat: avgLat, lng: avgLng });
    }
  }, [markers]);
  // console.log(markers)


  return (
    
          <Map center={defaultCenter} zoom={defaultZoom} markers={markers} click={click} />

        
  );
}

export default Locations;