import React, { useRef } from 'react';
import { useMarkerContext} from '../../../context/MarkerContext';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useHorizontalScroll } from '../../../Hooks/UseHorizontalScroll';
import { useDropdown } from "../../../context/DropdownContext";
import BottomLocationCard from './BottomLocationCard';
import BottomVehicleCard from './BottomVehicleCard';

function BottomCard({click,clickData}) {


  const { selectedOption } = useDropdown();
  const containerRef = useHorizontalScroll();
  console.log(clickData);
   
  

  return (
 
    <Container fluid ref={containerRef}
    className='m-0 p-0 px-3 ' style={{ overflowX: 'hidden', overflowY: 'auto', scrollbarWidth: 'none', 
    '-ms-overflow-style': 'none'}}>
    <Row className='flex-nowrap'>
    {selectedOption === null && <BottomLocationCard click={click} />}
    {selectedOption === "Locations" && <BottomLocationCard click={click} />}
    {selectedOption === "Vehicle"  &&  <BottomVehicleCard click={click} clickData={clickData}/>}
      
    </Row>
  </Container>
      

  )
}

export default BottomCard
