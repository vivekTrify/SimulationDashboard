import React from 'react'
import { useJourney } from '../../../context/JourneyContext';
import { Col, Card } from 'react-bootstrap';


const BottomJourneyCard = ({click}) => {
    const { dateJourneyCounts } = useJourney();

    const handleCardClick = (date, totalID) => {
        const Data = {date, totalID, clicked: true}
        click(Data);
        console.log(Data);
      };

  return (
    <>
     {Object.entries(dateJourneyCounts).map(([date, totalID], index) => (
  <Col key={index} className='m-1 p-1'>
    <Card onClick={() => handleCardClick(date, totalID)} style={{ minWidth: "200px", maxWidth: "auto", height: "100px" }}>
      <Card.Body>
        <Card.Title>{date}</Card.Title>
        <Card.Text>Total: {totalID.length}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
))}
    </>
  )
  
  
}

export default BottomJourneyCard
