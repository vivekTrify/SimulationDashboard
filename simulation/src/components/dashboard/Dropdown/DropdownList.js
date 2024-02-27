import React, { useState, useEffect } from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import { useDropdown } from '../../../context/DropdownContext';


const DropdownList = () => {

    const { selectedOption, updateSelectedOption } = useDropdown();
  
    const handleSelect = (item) => {
        updateSelectedOption(item);
      };


  return (
    <Dropdown className='rounded border border-primary my-4 mx-4' onSelect={handleSelect}>
      <Dropdown.Toggle  variant="light" id="dropdown-basic" className="d-flex justify-content-between align-items-center" style={{width:'100%'}}>
        { selectedOption || 'Location'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="SwapStation">SwapStation</Dropdown.Item>
        <Dropdown.Item eventKey="Vehicle">Vehicle</Dropdown.Item>
        <Dropdown.Item eventKey="Journey">Journey</Dropdown.Item>
        <Dropdown.Item eventKey="Locations">Locations</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownList
