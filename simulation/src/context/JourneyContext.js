import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a JourneyContext
const JourneyContext = createContext();

// Custom hook to use JourneyContext
export const useJourney = () => useContext(JourneyContext);

const JourneyProvider = ({ children }) => {
    const [journeyData, setJourneyData] = useState([]);
    const [journeyDates, setJourneyDates] = useState([]);
    const [dateJourneyCounts, setDateJourneyCounts] = useState({});
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dev-api.trify.us/api/rider/vehicle_journeys/1/");
        setJourneyData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      const dates = journeyData.map(entry => {
        if (entry.event_timestamp) {
          return entry.event_timestamp.substring(0, 10);
        } else {
          return null;
        }
      }).filter(date => date !== null);
  
      const uniqueDates = Array.from(new Set(dates));
      setJourneyDates(uniqueDates);
  
      const dateJourneyCounts = uniqueDates.reduce((acc, date) => {
        const journeysForDate = journeyData.filter(entry => entry.event_timestamp && entry.event_timestamp.substring(0, 10) === date);
        const journeyIds = [...new Set(journeysForDate.map(journey => journey.journey_id))];
        const journeyCounts = journeyIds.map(journeyId => ({
          id: journeyId,
          count: journeysForDate.filter(journey => journey.journey_id === journeyId).length
        }));
        return { ...acc, [date]: journeyCounts };
      }, {});
  
      setDateJourneyCounts(dateJourneyCounts);
      console.log(dateJourneyCounts)
    }, [journeyData]);
  
    return (
      <JourneyContext.Provider value={{ journeyDates, dateJourneyCounts }}>
        {children}
      </JourneyContext.Provider>
    );
  };
  
  

export default JourneyProvider;
