import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

function DetailsCard({data}) {
  return (
    <Container >
        {
            data.filteredMarkers.map((data)=>
            <Card className='m-3'>
            <Card.Body>
                <Row>
                    Name: {data.name}
                </Row>
                <Row>
                    <Col>Lat: {data.lat}</Col>
                    <Col>Lng: {data.lng}</Col>
                </Row>
            </Card.Body>
        </Card>
            
            )
        
        }
        
    </Container>
  )
}

export default DetailsCard
