import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Journey from '../../../Pages/Journey';
import { useDropdown } from '../../../../context/DropdownContext';


function VehicleDetailsCard({data,click}) {

  const {updateSelectedOption} = useDropdown();

  const [id, setId] = useState(data);
  
  useEffect(()=>{
    const ID =  data.pk || data.id;
    setId(ID)
    console.log(ID);
  },[data])
  console.log(id);
  const apiURL = `https://dev-api.trify.us/api/admin/latest_vehicle_state/?vehicle_id=${id}`
    

    const [newData, setNewData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(apiURL); 
            // const getData = JSON.stringify(response.data);
            // console.log(getData);
            setNewData(response.data);
            setLoading(false);
            console.log(response.data);
            // setId(null)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
        
    
      }, [id]);
      

      const [battery1Expanded, setBattery1Expanded] = useState(false);
  const [battery2Expanded, setBattery2Expanded] = useState(false);

  const toggleBattery1 = () => {
    setBattery1Expanded(!battery1Expanded);
  };

  const toggleBattery2 = () => {
    setBattery2Expanded(!battery2Expanded);
  };
      
  const handleJourneyView = (id) => {
    const data= {ID: id,fromVehicleID : true }
    
    click(data);
    updateSelectedOption("Journey")
  };

  return (
    <Container >
    
{loading ? 
        <div>Loading...</div>
       : 
        
          newData.map((data,index)=>
  
        <Card className='m-3'>
        <Card.Body>
            <Row>
                Name: Vehicle{data.vehicle_state.vehicle_id}
            </Row>
            <Row>
                Created At: {data.vehicle_state.created_at}
            </Row>
            <Row>Current Location:
                <Col>Lat: {data.vehicle_state.latitude}</Col>
                <Col>Lng: {data.vehicle_state.longitude}</Col>
            </Row>
            <Row>
                Speed: {data.vehicle_state.speed}
            </Row>
            
            <Row>
                Journey: {data.vehicle_state.journey_id}
            </Row>
            {/* <Row>
                Battery1 ID:  Battery{data.battery1_state.battery}<br/>
                Battery1 Soc: {data.battery1_state.soc}%
            </Row>
            <Row>
                Battery2 ID:  Battery{data.battery2_state.battery}<br/>
                Battery2 Soc: {data.battery2_state.soc}%
            </Row> */}
            <Row onClick={toggleBattery1} style={{ cursor: 'pointer' }}>
        Battery1 ID: Battery{data.battery1_state.battery}
        {battery1Expanded && (
          <div>
            <br />
            Battery1 Soc: {data.battery1_state.soc}%
          </div>
        )}
      </Row>
      <Row onClick={toggleBattery2} style={{ cursor: 'pointer' }}>
        Battery2 ID: Battery{data.battery2_state.battery}
        {battery2Expanded && (
          <div>
            <br />
            Battery2 Soc: {data.battery2_state.soc}%
          </div>
        )}
      </Row>
            <Row>
                <Button onClick={ () => handleJourneyView(id) }>View Journey</Button>
            </Row>
        </Card.Body>
    </Card> 
    )
    
   

      }   
</Container>
  )
}

export default VehicleDetailsCard
