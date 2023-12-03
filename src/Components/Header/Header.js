
//import useState hook to create menu collapse state
import React, { useState } from "react";
//import react pro sidebar components
// import ossglogo from "../../Assets/OSSG.gif";
import proteanlogo from "../../Assets/protean.jpg"
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaPowerOff } from "react-icons/fa";
import { FiHome, FiLogOut} from "react-icons/fi";
import { GiGreenPower } from "react-icons/gi";
import { FaUserPlus } from "react-icons/fa6";


//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";


const Header = ({setLogin,path,path2,path3}) => {

    const navigate = useNavigate();
    //create initial menuCollapse state using useState hook
    // eslint-disable-next-line
    const [menuCollapse, setMenuCollapse] = useState(false)

    const handellock = () =>{
      localStorage.clear();
      setLogin(false);
      navigate("/");
      window.location.reload(true);
    }

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    // menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext mt-3 text-center">
              {/* small and big change using menucollapse state */}
              {/* <p>{menuCollapse ? "Logo" : "Protean eGov"}</p> */}
              <img src={proteanlogo} alt="logo" style={{width:"75%",height:"100%"}} className="mt-1 mb-3"></img>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {/* {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )} */}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem data={{route:"/"}} className="act" icon={<FiHome />}> <Link className="act" style={{color:'black'}} to="/">Home</Link></MenuItem>
              {/* {path3 === undefined ? <MenuItem data={{route:"/"}} className="act" icon={<FiHome />}> <Link className="act" style={{color:'black'}} to="/">Home</Link></MenuItem>:<MenuItem data={{route:`/${path3}`}} className="act" icon={<FiHome />}><Link className="act" style={{color:'black'}} to={`/${path3}`}>Home</Link></MenuItem>} */}
              {path === undefined ? <MenuItem data={{route:"/changelog"}} className="act" icon={<FaList />}><Link className="act" style={{color:'black'}} to="/changelog">Change Log</Link></MenuItem>:<MenuItem data={{route:`/changelog/${path}`}} className="act" icon={<FaList />}><Link className="act" style={{color:'black'}} to={`/changelog/${path}`}>Change Log</Link></MenuItem>}
              {path2 === undefined ? <MenuItem data={{route:"/powerof"}} className="act" icon={<FaPowerOff />}><Link className="act" style={{color:'black'}} to="/powerof">Powerd OFF VMs</Link></MenuItem>:<MenuItem data={{route:`/powerof/${path2}`}} className="act" icon={<FaPowerOff />}><Link className="act" style={{color:'black'}} to={`/powerof/${path2}`}>Powerd OFF VMs</Link></MenuItem>}
              
              <MenuItem data={{route:"/decommision"}} className="act" icon={<GiGreenPower />}><Link className="act" style={{color:'black'}} to="/decommision">Decommision</Link></MenuItem>
              <MenuItem data={{route:"/newuser"}} className="act" icon={<FaUserPlus />}><Link className="act" style={{color:'black'}} to="/newuser">New User</Link></MenuItem>

            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
             <MenuItem icon={<FiLogOut />}><Link className="act" style={{color:'black'}} onClick={handellock}>Logout</Link></MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
