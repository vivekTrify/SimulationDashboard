import React from 'react'
import { Card, Container, Row, Col} from 'react-bootstrap'
import { useJourney } from '../../../../context/JourneyContext';


function JourneyDetailsCard({data, click}) {
    const {filterJourneyData, passJourney } = useJourney();
    console.log(data);
    const handleCardClick = (journeyID) => {
        const filteredJourneys = filterJourneyData(data.date, journeyID);
        passJourney(filteredJourneys);
       console.log(filteredJourneys)
      };
   
  return (
    <Container>

            <h3>{data.date}</h3><br/>
            {
                data.totalID.map(entry => ( // Change 'data' variable name inside map function to avoid conflict
                    <Card key={entry.id} className='p-3 m-3' onClick={() => handleCardClick(entry.id)}>
                        {/* <Card.Title>{entry.id}</Card.Title> */}
                        <Card.Body>
                            <Row><Col> Journey ID:<strong>{entry.id}</strong></Col></Row>
                            <Row>Total Waypoints:  {entry.count}</Row>
                        </Card.Body>
                    </Card>
                ))
            }
        </Container>
  );
}

export default JourneyDetailsCard
