
import React, { createContext, useContext, useState } from 'react';

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const updateSelectedOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <DropdownContext.Provider value={{ selectedOption, updateSelectedOption }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  return useContext(DropdownContext);
};
