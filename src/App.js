
import React, { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Changelog from './Components/Changelog/Changelog';
import Powerof from './Components/Powerof/Powerof';
import Decommision from './Components/Decommision/Decommision';
import Linux from './Components/Linux/Linux';
import Hardware from './Components/Hardware/Hardware';
import Login from './Components/Login/Login';

function App() {

  const [login,setLogin] = useState(false);

  const us = localStorage.getItem("username");
  const ps = localStorage.getItem("password");
  return (


   (us==="ritesh" && ps === "ritesh") ?
    
    <BrowserRouter>
    <Routes>
    <Route path="linux" element={<Linux setLogin={setLogin}/>}/>
    <Route path="hardware" element={<Hardware setLogin={setLogin}/>}/>
     <Route path="changelog" element={<Changelog/>}/>
     <Route path="powerof" element={<Powerof/>}/>
     <Route path="decommision" element={<Decommision/>}/>
     <Route path="/" element={<Home/>}/>
    </Routes>

    </BrowserRouter> :<Login setLogin={setLogin}/>
  );
}

export default App;
