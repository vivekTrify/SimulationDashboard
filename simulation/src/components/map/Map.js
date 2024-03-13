import React, { useEffect, useRef } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import MarkerSVG from '../../assets/markerIcon/MarkerSVG';

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


function Map({ center, zoom, markers, click }) {
  const mapRef = useRef(null);

  const handleMarkerClick = (marker) => {
    // Your logic when a marker is clicked
    marker.markerClicked = true;
    click(marker);
    // console.log('Marker clicked:', marker,click);
  }

  useEffect(() => {
    if (markers.length === 0 || !mapRef.current) return;

    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((marker) => {
      bounds.extend(marker.position);
    });

    mapRef.current.fitBounds(bounds);

    // Set max zoom level to prevent the map from zooming in too much
    const maxZoom = 20;
    const listener = window.google.maps.event.addListener(mapRef.current, "idle", () => {
      if (mapRef.current.getZoom() > maxZoom) mapRef.current.setZoom(maxZoom);
      window.google.maps.event.removeListener(listener);
    });
  }, [markers]);

  const MapComponent = withGoogleMap(() => (
    <GoogleMap ref={mapRef} defaultCenter={center} defaultZoom={zoom}>
      {markers.map((marker, index) => {
       
        return (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            title = {marker.name}
            icon={{
              url: MarkerSVG({ color: marker.color }),
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 40)
            }}
            onClick={() => handleMarkerClick(marker)}
            
          />
          );
      })}
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

export default Map;
