import React, { useRef } from 'react';
import { useMarkerContext} from '../../../context/MarkerContext';
import { Card, Col } from 'react-bootstrap';
import { useHorizontalScroll } from '../../../Hooks/UseHorizontalScroll';

function BottomLocationCard( {click}) {

    
    const { getTypeCounts, filterMarkersByType, updateMarkerData } = useMarkerContext();
    const List = getTypeCounts();
   
    const handleCardClick = (type) => {
      const FilterData = filterMarkersByType(type);
      click(FilterData);
      updateMarkerData(FilterData);
    };
  return (
    <>
      {List.map((list, index) => (
        <Col key={index} className='m-1 p-1' >
          <Card onClick={() => handleCardClick(list.type)} style={{ minWidth: "200px", maxWidth: "auto", height: "100px" }}>
            <Card.Body>
              <Card.Title>{list.type}</Card.Title>
              <Card.Text>Total: {list.count}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default BottomLocationCard
