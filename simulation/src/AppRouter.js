import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SwapStation from './components/Pages/SwapStation';
import Vehicle from './components/Pages/Vehicle';
import { DropdownProvider } from "../src/context/DropdownContext";


const AppRouter = () => {
  return (
    <DropdownProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/swapStation" element={<SwapStation />} />
        <Route path="/vehicle" element={<Vehicle />} />
      </Routes>
    </Router>
    </DropdownProvider>
  );
}

export default AppRouter;