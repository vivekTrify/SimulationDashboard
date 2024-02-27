import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Journey from '../../../Pages/Journey';


function VehicleDetailsCard({data}) {

  const [id, setId] = useState(null);
  
  useEffect(()=>{
    // const Id = data.pk;
    // console.log(Id);
    setId(data.pk)
    // console.log(id);
  },[data])
  console.log(id);
    

    const [newData, setNewData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://dev-api.trify.us/api/admin/latest_vehicle_state/?vehicle_id=1"); 
            // const getData = JSON.stringify(response.data);
            // console.log(getData);
            setNewData(response.data);
            setLoading(false);
            console.log(response.data);
            setId(null)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
        
    
      }, []);
      console.log(newData);

     
      

  return (
    <Container >
    
{loading ? 
        <div>Loading...</div>
       : 
        
          newData.map((data)=>
  
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
            <Row>
                Battery1 ID:  Battery{data.battery1_state.battery}<br/>
                Battery1 Soc: {data.battery1_state.soc}%
            </Row>
            <Row>
                Battery2 ID:  Battery{data.battery2_state.battery}<br/>
                Battery2 Soc: {data.battery2_state.soc}%
            </Row>
            <Row>
                <Button>View Journey</Button>
            </Row>
        </Card.Body>
    </Card> 
    )
    
   

      }   
</Container>
  )
}

export default VehicleDetailsCard
