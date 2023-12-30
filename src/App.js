
import React, { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Decommision from './Components/Decommision/Decommision';
import Linux from './Components/Linux/Linux';
import LinuxChangeLog from './Components/LinuxChangeLog/LinuxChangeLog';

import Hardware from './Components/Hardware/Hardware';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ChangelogHome from './Components/ChangelogHome';
import HardwareChangeLog from './Components/HardwareChangeLog/HardwareChangeLog';
import PowerOffHome from './Components/PowerOffHome';
import LinuxPowerOff from './Components/LinuxPowerOff/LinuxPowerOff';
import HardwarePowerOff from './Components/HardwarePowerOff/HardwarePowerOff';


function App() {

  const [login,setLogin] = useState(false);

  const us = localStorage.getItem("username");
  const ps = localStorage.getItem("password");
  const unused = localStorage.getItem("unused");
  const isadmin = localStorage.getItem("temp");

  // console.log(us);
  // console.log(ps);

  // if(us !== null && ps !== null){
  //   setLogin(true);
  // }

  return (


   (us !== null && ps !== null && unused === "   ") ?
    
    <BrowserRouter>
    <Routes>
    <Route path="linux" element={<Linux setLogin={setLogin}/>}/>
    <Route path="hardware" element={<Hardware setLogin={setLogin}/>}/>
     <Route path="changelog" element={<ChangelogHome setLogin={setLogin}/>}/>
     <Route path="powerof" element={<PowerOffHome setLogin={setLogin}/>}/>
     <Route path="decommision" element={<Decommision setLogin={setLogin}/>}/>
     {isadmin == "1234" ? <Route path="newuser" element={<Signup setLogin={setLogin}/>}/> : ""}
     <Route path="changelog/linuxchangelog" element={<LinuxChangeLog setLogin={setLogin}/>}/>
     <Route path="changelog/hardwarechangelog" element={<HardwareChangeLog setLogin={setLogin}/>}/>
     <Route path="powerof/linuxpoweroff" element={<LinuxPowerOff setLogin={setLogin}/>}/>
     <Route path="powerof/hardwarepoweroff" element={<HardwarePowerOff setLogin={setLogin}/>}/>






     <Route path="/" element={<Home setLogin={setLogin}/>}/>
    </Routes>
    
    </BrowserRouter> :<Login setLogin={setLogin}/>
  );
}

export default App;
