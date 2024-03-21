import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BarChart from "../Chart/BarChart";
import DropdownList from "../SideCard/DropdownList/DropdownList";
import { useDropdown } from "../../../context/DropdownContext";
import LogoImage from "../../../assets/TrifyLogo.png";
import { useMarkerContext } from "../../../context/MarkerContext";
import DetailsCard from "./DetailsCard";
import VehicleDetailsCard from "./DetailsCard/VehicleDetailsCard";
import LocationDetailsCard from "./DetailsCard/LocationDetailsCard";
import SwapStationDetailsCard from "./DetailsCard/SwapStationDetailsCard";
import JourneyDetailsCard from "./DetailsCard/JourneyDetailsCard";
import ToogleSwitch from "./ToogleSwitch/ToogleSwitch";

function SideCard({ click, clickData }) {
  const { getTypeCounts, updateMarkerData, getAllMarkers } = useMarkerContext();
  const List = getTypeCounts();
  const TotalLocation = getAllMarkers();
  // const { selectedOption } = useDropdown();

  const { selectedOption, updateSelectedOption } = useDropdown();
  const [isChecked, setIsChecked] = useState(false);

  console.log(clickData);

  // const { selectedOption } = useDropdown();
  const handleBarClick = (index) => {
    console.log("Clicked on bar at index:", index);
  };

  const handleAllClick = () => {
    updateMarkerData(TotalLocation);
  };


    const handleSwitchChange = () => {
        setIsChecked(!isChecked);
        isChecked ? updateSelectedOption("SwapStation") : updateSelectedOption("Vehicle");
    };

   

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card border="light">
            <Row>
              <Card.Header >
                <Row >
                  <Col>
                    <img
                      src={LogoImage}
                      style={{ width: "50%", margin: "2%" }}
                    />
                  </Col>
                  <Col>
                    <ToogleSwitch 
                      style={{ width: "50%", margin: "2%" }}
                      label={isChecked ? "Active" : "Inactive"}
                      checked={isChecked}
                      onChange={handleSwitchChange}
                      className="custom-switch-large"
                    />
                    <DropdownList List={["SS1","SS2","SS3"]} />
                  </Col>
                </Row>
                {/* <img src={LogoImage} style={{ width: "30%", margin: "2%" }} /> */}
                {/* <DropdownList /> */}
                <div>
                  <BarChart
                    data={{
                      labels: List.map((item) => item.type),
                      values: List.map((item) => item.count),
                      color: List.map((item) => item.color),
                    }}
                    onBarClick={handleBarClick}
                    chartHeight={"5vh"}
                  />
                </div>
              </Card.Header>
            </Row>
            <Row>
              <Card.Body>
                {/* <Row className="p-3">
                  <Col className="col-9">
                    <Card.Title>
                      <h3>Total {selectedOption} List</h3>
                    </Card.Title>
                  </Col>
                  <Col className="d-flex justify-content-end col-3">
                    <Button onClick={handleAllClick} className="align-self-end">
                      {" "}
                      <h5>All</h5>
                    </Button>
                  </Col>
                </Row> */}
                <Row className="p-3">
                  {selectedOption === null &&
                    clickData &&
                    !clickData.markerClicked && (
                      <DetailsCard data={clickData} />
                    )}
                  {selectedOption === "Locations" &&
                    clickData &&
                    !clickData.markerClicked && (
                      <DetailsCard data={clickData} />
                    )}
                  {selectedOption === "Locations" &&
                    clickData &&
                    clickData.markerClicked && (
                      <LocationDetailsCard data={clickData} />
                    )}
                  {selectedOption === null &&
                    clickData &&
                    clickData.markerClicked && (
                      <LocationDetailsCard data={clickData} />
                    )}
                  {selectedOption === "Vehicle" && clickData && (
                    <VehicleDetailsCard data={clickData} click={click} />
                  )}
                  {selectedOption === "SwapStation" && clickData && (
                    <SwapStationDetailsCard data={clickData} click={click} />
                  )}
                  {selectedOption === "Journey" &&
                    clickData &&
                    clickData.clicked && (
                      <JourneyDetailsCard data={clickData} click={click} />
                    )}
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
