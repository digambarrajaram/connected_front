
import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Changelog from './Components/Changelog/Changelog';
import Powerof from './Components/Powerof/Powerof';
import Decommision from './Components/Decommision/Decommision';
import Linux from './Components/Linux/Linux';
import Hardware from './Components/Hardware/Hardware';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="linux" element={<Linux/>}/>
      <Route path="hardware" element={<Hardware/>}/>
      <Route path="changelog" element={<Changelog/>}/>
      <Route path="powerof" element={<Powerof/>}/>
      <Route path="decommision" element={<Decommision/>}/>
      <Route path="/" element={<Home/>}/> 
    </Routes>

    </BrowserRouter>
  );
}

export default App;
