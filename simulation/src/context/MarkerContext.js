import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import MarkerColor from '../Data/MarkerColor';

// Define initial state
const initialState = {
  markers: [],
  filteredMarkers: [],
};

// Define action types
const SET_MARKERS = 'SET_MARKERS';
const FILTER_MARKERS = 'FILTER_MARKERS';

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case SET_MARKERS:
      return {
        ...state,
        markers: action.payload,
      };
    case FILTER_MARKERS:
      return {
        ...state,
        filteredMarkers: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const MarkerContext = createContext();

// Create custom hook to access the context
export const useMarkerContext = () => useContext(MarkerContext);

// MarkerProvider component
export const MarkerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dev-api.trify.us/api/admin/destinations/");
        const getData = JSON.parse(response.data);
        const newMarkers = getData.map((data) => ({ 
          lat: data.fields.latitude, 
          lng: data.fields.longitude, 
          type: data.fields.type,
          name: data.fields.name,
          color: MarkerColor[data.fields.type] || "Orange"
        }));

        dispatch({ type: SET_MARKERS, payload: newMarkers });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to return all new marker data
  const getAllMarkers = () => state.markers;

  // Function to filter markers by type
  const filterMarkersByType = (type) => {
    const filteredMarkers = state.markers.filter(marker => marker.type === type);
    const totalCount = filteredMarkers.length;
    return { filteredMarkers, totalCount };
  };


  // Function to get types, counts, and colors
  const getTypeCounts = () => {
    const typeCounts = {};

    state.markers.forEach(marker => {
      if (!typeCounts[marker.type]) {
        typeCounts[marker.type] = {
          type: marker.type,
          color: marker.color,
          count: 0,
        };
      }
      typeCounts[marker.type].count++;
    });

    return Object.values(typeCounts);
  };


  //showMarker setting;
  const [showMarker, setShowMarker] = useState([]);

  useEffect(() => {
    setShowMarker(state.markers);
  }, [state.markers]);

 

  const updateMarkerData = (data) => {
    if (data && data.filteredMarkers) {
        setShowMarker(data.filteredMarkers);
      } else {
        setShowMarker(data);
      }
  }
  
  const markerData = () => {
    return showMarker;
  }

  // Provide context value
  const contextValue = {
    ...state,
    getAllMarkers,
    filterMarkersByType,
    getTypeCounts,
    updateMarkerData,
    markerData,
  };

  return (
    <MarkerContext.Provider value={contextValue}>
      {children}
    </MarkerContext.Provider>
  );
};
