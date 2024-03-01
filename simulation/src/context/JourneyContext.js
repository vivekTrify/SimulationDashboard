import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';

// Create a JourneyContext
const JourneyContext = createContext();

// Custom hook to use JourneyContext
export const useJourney = () => useContext(JourneyContext);

const JourneyProvider = ({ children, id }) => {
    const [journeyData, setJourneyData] = useState([]);
    const [journeyDates, setJourneyDates] = useState([]);
    const [dateJourneyCounts, setDateJourneyCounts] = useState({});
    const [journeyPoints, setJourneyPoints] = useState([]);
  
    useEffect(() => {
      id?(fetchData()): console.log("id not set");
    }, [id]); // Make sure to re-fetch data when id changes
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dev-api.trify.us/api/rider/vehicle_journeys/${id}/`);
        console.log(response.data.data)
        setJourneyData(response.data.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


     // Function to filter journey data based on date and journey ID
     const filterJourneyData = (date, journeyId) => {
      return journeyData.filter(entry => {
        const entryDate = entry.event_timestamp.substring(0, 10);
        return entryDate === date && entry.journey_id === journeyId;
      });
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
      // console.log(dateJourneyCounts)
    }, [journeyData]);


    const passJourney = (obj) => {
      setJourneyPoints(obj);
  };

  const getJourney = () => {return journeyPoints};
  
    return (
      <JourneyContext.Provider value={{ journeyDates, dateJourneyCounts, filterJourneyData, passJourney, getJourney }}>
        {children}
      </JourneyContext.Provider>
    );
};

export default JourneyProvider;
