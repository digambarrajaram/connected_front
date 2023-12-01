
import React, { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Powerof from './Components/Powerof/Powerof';
import Decommision from './Components/Decommision/Decommision';
import Linux from './Components/Linux/Linux';
import LinuxChangeLog from './Components/LinuxChangeLog/LinuxChangeLog';

import Hardware from './Components/Hardware/Hardware';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ChangelogHome from './Components/ChangelogHome';

function App() {

  const [login,setLogin] = useState(false);

  const us = localStorage.getItem("username");
  const ps = localStorage.getItem("password");

  console.log(us);
  console.log(ps);

  // if(us !== null && ps !== null){
  //   setLogin(true);
  // }

  return (


   (ps !== null && us !== null) ?
    
    <BrowserRouter>
    <Routes>
    <Route path="linux" element={<Linux setLogin={setLogin}/>}/>
    <Route path="hardware" element={<Hardware setLogin={setLogin}/>}/>
     <Route path="changelog" element={<ChangelogHome setLogin={setLogin}/>}/>
     <Route path="powerof" element={<Powerof setLogin={setLogin}/>}/>
     <Route path="decommision" element={<Decommision setLogin={setLogin}/>}/>
     <Route path="newuser" element={<Signup setLogin={setLogin}/>}/>
     <Route path="linuxchangelog" element={<LinuxChangeLog setLogin={setLogin}/>}/>


     <Route path="/" element={<Home setLogin={setLogin}/>}/>
    </Routes>

    </BrowserRouter> :<Login setLogin={setLogin}/>
  );
}

export default App;
