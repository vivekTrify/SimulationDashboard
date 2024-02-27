import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card,Col } from 'react-bootstrap';

function BottomVehicleCard({click, clickData}) {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://dev-api.trify.us/api/admin/vehicles/"); 
            const getData = JSON.parse(response.data);
            console.log(getData);
            setData(getData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
        
    
      }, []);
    

    const handleCardClick = (data) => {

        click(data);
        // const dataD = click(data);
        console.log(clickData);

    };
  return (
    <>
      {data.map((data, index) => (
        <Col key={index} className='m-1 p-1' >
          <Card onClick={() => handleCardClick(data)} style={{ minWidth: "200px", maxWidth: "auto", height: "100px" }}>
            <Card.Body>
              <Card.Title>Vehicle{data.pk}</Card.Title>
              <Card.Text>Location: {data.fields.home_latitude}, {data.fields.home_longitude}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default BottomVehicleCard
