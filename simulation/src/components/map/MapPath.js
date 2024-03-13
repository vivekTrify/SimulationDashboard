import React, { useEffect, useState } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';

function MapPath({ journeys }) {
  const [directions, setDirections] = useState(null);
  console.log(journeys)

  useEffect(() => {
    if (journeys.length === 0) return;

    const waypoints = journeys.map(journey => ({
      location: { lat: parseFloat(journey.latitude), lng: parseFloat(journey.longitude) },
      stopover: true
    }));
    console.log(waypoints[0].location);

    const directionsService = new window.google.maps.DirectionsService();

    const totalWaypoints = waypoints;
    const totalLength = totalWaypoints.length;
    const batchSize = 25;
    const step = Math.floor(totalLength / batchSize); // Calculate step size

const selectedWaypoints = [];
let currentIndex = 0;

for (let i = 0; i < batchSize; i++) {
  selectedWaypoints.push(totalWaypoints[currentIndex]);
  currentIndex += step;
}

console.log(selectedWaypoints);

    const request = {
      origin: selectedWaypoints[0].location,
      destination: selectedWaypoints[selectedWaypoints.length - 1].location,
      waypoints: selectedWaypoints.slice(1, -1),
      travelMode: 'DRIVING'
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        setDirections(result);
      } else {
        console.error('Directions request failed:', status);
      }
    });
  }, [journeys]);

  const MapComponent = withGoogleMap(() => (
    <GoogleMap defaultCenter={{ lat: 12.9716, lng: 77.5946 }} defaultZoom={12}>
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  ));

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapComponent
        containerElement={<div style={{ height: `100vh`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default MapPath;