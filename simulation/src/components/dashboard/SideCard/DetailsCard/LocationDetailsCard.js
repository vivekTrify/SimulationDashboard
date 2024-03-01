import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';

function LocationDetailsCard(data) {
    const myData = data.data;
  return (
   <Container>
    <Row>
      <Col>
      <Card>
        <Card.Title>
          {myData.name}
        </Card.Title>
        <Card.Body>
          <Row>
            Type: {myData.type}
          </Row>
          <Row>
            Name: {myData.name}
          </Row>
          <Row>
            <Row>
            Location:
            </Row>
            <Row>
              <Col>Lat: {myData.lat}</Col>
              <Col>Lng: {myData.lng}</Col>
            </Row>
          </Row>
        </Card.Body>
      </Card>
      </Col>
    </Row>
   </Container>
  )
}

export default LocationDetailsCard
