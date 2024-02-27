import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BarChart from "../Chart/BarChart";
import DropdownList from "../Dropdown/DropdownList";
import { useDropdown } from "../../../context/DropdownContext";
import LogoImage from "../../../assets/TrifyLogo.png";
import { useMarkerContext} from '../../../context/MarkerContext';
import DetailsCard from "./DetailsCard";
import VehicleDetailsCard from "./DetailsCard/VehicleDetailsCard";


function SideCard({click, clickData}) {

  const { getTypeCounts, updateMarkerData, getAllMarkers } = useMarkerContext();
  const List = getTypeCounts();
  const TotalLocation = getAllMarkers();
 console.log(clickData);
  

  const { selectedOption } = useDropdown();
  const handleBarClick = (index) => {
    console.log("Clicked on bar at index:", index);
  };


  const handleAllClick = () => {
    updateMarkerData(TotalLocation);
  }


  return (
    <Container fluid>
      <Row>
        <Col>
          <Card border="light">
            <Row>
              <Card.Header>
                <img src={LogoImage} style={{ width: "30%", margin: "2%" }} />
                <DropdownList />
                <div>
                
                  <BarChart
                   data={{
                      labels: List.map(item => item.type), 
                      values: List.map(item => item.count),
                      color: List.map(item => item.color),
                    }}
                    onBarClick={handleBarClick}
                    chartHeight= {"5vh"}
                  />
                </div>
              </Card.Header>
            </Row>
            <Row>
              <Card.Body>
                <Row className="p-3" >
                
                  <Card.Title><h2>
                      Total {selectedOption} List
                    </h2> 
                </Card.Title>
                  <Row >
                    <Col>
                    <Row>
                    <h5>Total Count : {TotalLocation.length}</h5>
                    </Row>
                    <Row>
                      <h5> Total Type: {List.length}</h5>
                    </Row>
                    
                    </Col>
                    <Col className="d-flex justify-content-end">
                    <Button onClick={handleAllClick} className="align-self-end"> <h5>All</h5></Button>
                    </Col>
                  </Row>
                </Row>
                <Row className="p-3">
                  {/* {
                    List.map((list)=>
                    <DetailsCard data={DetailsData}/>
                    
                    )
                  } */}
                  {selectedOption === null && clickData && <DetailsCard data={clickData} />}
                  {selectedOption === "Locations" && clickData && <DetailsCard data={clickData} />}
                  {selectedOption === "Vehicle" && clickData && <VehicleDetailsCard data={clickData} />}
                </Row>
                
                
              </Card.Body>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SideCard;
