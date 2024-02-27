import React, { useEffect, useState } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';

function MapPath({ journeys }) {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (journeys.length === 0) return;

    const waypoints = journeys.map(journey => ({
      location: { lat: journey.waypoints[0].lat, lng: journey.waypoints[0].lng },
      stopover: true
    }));

    const directionsService = new window.google.maps.DirectionsService();

    const request = {
      origin: waypoints[0].location,
      destination: waypoints[waypoints.length - 1].location,
      waypoints: waypoints.slice(1, -1),
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