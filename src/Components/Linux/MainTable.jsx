import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'
// import { MdOutlineHideSource } from "react-icons/md";
import "./MainTable.css";
import * as Icons from '@material-ui/icons'
import FilterAltIcon from '@material-ui/icons/FilterList';
import GetApp from '@material-ui/icons/GetApp';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


const MainTable = React.memo(() => {

  const iconsMapping = Object.entries(Icons).reduce((acc, [name, icon]) => {
    acc[name] = () => React.createElement(icon);
    return acc;
  }, {});

  const tableIcons = {
    ...iconsMapping,
    Filter: () => <FilterAltIcon/>, // You can customize export icon as well
    Export: () => <GetApp/>, // You can customize export icon as well
    NextPage: () => <NavigateNextIcon/>,
    PreviousPage: () => <ChevronLeftIcon/>
  };


    const [data,setData] = useState([]);
    // const [rerender, toggleRerender] = useReducer((state) => !state, false);

    const findDifferences = (obj1, obj2) => {
      let news = [];
      return Object.keys(obj1).reduce((differences, key) => {
        if (obj1[key] !== obj2[key]) {
          news.push(`${key} ==> ${obj1[key]} to ${obj2[key]} \n`);
          differences[key] = { OldData: obj1[key], NewData: obj2[key] };
        }
        // console.log(news);
        // const differencesString = news.join('\n');
        // console.log(differencesString);
        return news;
      }, {});
    };

    // const [filter,setFilter] = useState(false);
    const addUpdateData = useCallback( async (newData) =>{
      console.log(newData.sid);

      if(newData.sid !== undefined){

        const previousData = await axios.get(`/inventory/linuxbyid/${newData.sid}`);
        console.log(previousData.data);

        const differences = findDifferences(previousData.data, newData);
        const finalString = differences.join('\n')
        console.log(finalString);


        const postchange = await axios.post("/inventory/inventorychangelog",{
          "uniqueid":newData.sid,
          "ip":newData.physical_IP,
          "remark":finalString,
          "user":localStorage.getItem("username")
        });
        console.log(postchange);
        const serverdata = await axios.post("/inventory/addserver",newData);
        console.log(serverdata.data); 
        window.location.reload(true) 
        // toggleRerender();

      }else{

        const serverdata = await axios.post("/inventory/addserver",newData);
        console.log(serverdata.data); 

        const lid = await axios.get(`inventory/getsid`);
        console.log(lid.data);

        const postchange = await axios.post("/inventory/inventorychangelog",{
          "uniqueid":lid.data,
          "ip":newData.physical_IP,
          "remark":`New Server Added ==> ${newData.server_NAME} IP ==> ${newData.physical_IP}`,
          "user":localStorage.getItem("username")
        });
        console.log(postchange);
        

        
        // alert("new Added")
        window.location.reload(true)
      }
        
    })

    const deleteData = async (sid) => {
      const previousData = await axios.get(`/inventory/linuxbyid/${sid}`);
        console.log(previousData.data);

      const postchange = await axios.post("/inventory/inventorychangelog",{
        "uniqueid":sid,
        "ip":previousData.data.physical_IP,
        "remark":`Server Deleted`,
        "user":localStorage.getItem("username")
      });

        const deleteserverdata = await axios.post(`/inventory/deleteserver/${sid}`);
        console.log(deleteserverdata.data);
        window.location.reload(true) 
    }

    const getdata = async () => {
  
      const response = await axios.get(`/inventory/serverlist/${false}`);
  
      console.log(response.data);
  
      setData(response.data);
    }
    
  useEffect(() => {
    getdata();
  }, [])

  const categories = ['NA','PROD', 'TEST'];
  const drshift = ['NA','Yes','No'];
  const pammap = ['NA','Yes','No'];
  const nagiosconf = ['NA','Yes','No'];
  const antiv = ['NA','Yes','No','Exception'];
  const cis = ['NA','Yes','No'];
  const powers = ['NA','powerdOn','poweredOff'];
  const supsta = ['NA','InSupport','OutOfSupport','Exception'];
  const locationd = ['NA','PUNE','BLR'];
  const osdetails = ['NA','SUSE12SP5','SUSE15SP4', 'SUSE15SP2','VMwarePhotonOS-OtherLinux','RHEL7.2','SUSE12SP1','RHEL6.1','Centos7.0','RHEL6.5','SUSE11SP1','SUSE11SP4','SUSE11SP3','Centos9.0','Ubuntu22.04','RHEL5','OtherLinux','Ubuntu16.04.6','Ubuntu18.04.6','CentOSStream9','Centos8.0','SUSE12SP4','Centos9','Legacy','OracleLinux8.5','Centos7.6','Centos8','Ubuntu20.04','SUSE15sp5','Centos7.5','Centos7.9','CustomLinux','RHEL5.2','SUSE12SP3'];

  
  const projectn = ['NA','GST','BECKEN','OSSG','TIN','CBFC','CRA','TELEMEDICINE','IPAN','DOT','EDASTKHAT','SecurityInfo','E-SIGN','VL','VS']
// eslint-disable-next-line
    const [columns, setColumns] = useState([
        {
            title: 'No.',
            render: (rowData) => rowData.tableData.id + 1,
            editable: 'never',
          },
          { title: 'UniqueId', field: 'sid', emptyValue:() => <em>NA</em>,editable:'never' },
        { title: 'Server Name', field: 'server_NAME', emptyValue:() => <em>NA</em> },
        { title: 'Physical IP', field: 'physical_IP', emptyValue:() => <em>NA</em>},
        { title: 'Pune_NAT_IP', field: 'pune_NAT_IP', emptyValue:() => <em>NA</em>},
        { title: 'Blr_NAT_IP', field: 'blr_NAT_IP', emptyValue:() => <em>NA</em>},
        { title: 'Project Name', field: 'project_NAME', emptyValue:() => <em>NA</em>,
        lookup: projectn.reduce((acc,lo)=>{
          // console.log(lo);
          acc[lo] = lo;
          // console.log(acc);
          return acc;
        },{}),
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {projectn.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        {
          title: 'Environment',
          field: 'environment',
          lookup: categories.reduce((acc,lo)=>{
            // console.log(lo);
            acc[lo] = lo;
            // console.log(acc);
            return acc;
          },{}),
          editComponent: (props) => (
            <select
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
              style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          ),
          
        },
        // { title: 'Environment', field: 'environment', emptyValue:() => <em>NA</em>, filtering:"multi-select"},
        { title: 'OS', field: 'os', emptyValue:() => <em>NA</em>,
        lookup: osdetails.reduce((acc,lo)=>{
          // console.log(lo);
          acc[lo] = lo;
          // console.log(acc);
          return acc;
        },{}),
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {osdetails.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),
      },
        { title: 'Location', field: 'location', emptyValue:() => <em>NA</em>,
        lookup: locationd.reduce((acc,lo)=>{
          // console.log(lo);
          acc[lo] = lo;
          // console.log(acc);
          return acc;
        },{}),
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {locationd.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Power Status', field: 'power_STATUS', emptyValue:() => <em>NA</em>,
        lookup: powers.reduce((acc,lo)=>{
          // console.log(lo);
          acc[lo] = lo;
          // console.log(acc);
          return acc;
        },{}),
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {powers.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Support Status', field: 'support_STATUS', emptyValue:() => <em>NA</em>,
        lookup: supsta.reduce((acc,lo)=>{
          // console.log(lo);
          acc[lo] = lo;
          // console.log(acc);
          return acc;
        },{}),
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {supsta.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'DR_Shifting_Status', field: 'drshiftingstatus', emptyValue:() => <em>NA</em>,
        lookup: drshift.reduce((acc,lo)=>{
          // console.log(lo);
          acc[lo] = lo;
          // console.log(acc);
          return acc;
        },{}),
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {drshift.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'PamMapping', field: 'pammapping', emptyValue:() => <em>NA</em>,
        lookup: pammap.reduce((acc,lo)=>{
          // console.log(lo);
          acc[lo] = lo;
          // console.log(acc);
          return acc;
        },{}),
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {pammap.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Nagios Configured', field: 'nagiosconfigured', emptyValue:() => <em>NA</em>,
        lookup: nagiosconf.reduce((acc,lo)=>{
          // console.log(lo);
          acc[lo] = lo;
          // console.log(acc);
          return acc;
        },{}),
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {nagiosconf.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Antivirus', field: 'antivirus', emptyValue:() => <em>NA</em>,
        lookup: antiv.reduce((acc,lo)=>{
          // console.log(lo);
          acc[lo] = lo;
          // console.log(acc);
          return acc;
        },{}),
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {antiv.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'CIS', field: 'cis', emptyValue:() => <em>NA</em>,
        lookup: cis.reduce((acc,lo)=>{
          // console.log(lo);
          acc[lo] = lo;
          // console.log(acc);
          return acc;
        },{}),
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {cis.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Owner', field: 'owner', emptyValue:() => <em>NA</em>},
        { title: 'Secondary Owner', field: 'secondaryowner', emptyValue:() => <em>NA</em>},
        // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        // {
          // support_STATUS
        //   title: 'Birth Place',
        //   field: 'birthCity',
        //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        // },
      ]);
    
    //   const [data, setData] = useState([
    //     { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    //     { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    //   ]);
    
      return (
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{paddingRight:"0"}}>
            <div className='mt-1' style={{width:"100%"}}>
        <MaterialTable
          title="Linux Inventory"
          columns={columns}
          icons={tableIcons}
          data={data}
          editable={{
            onRowAdd: newData =>
            new Promise((resolve, reject) => {
                  
                setTimeout(() => {
                //   setData([...data, newData]);
                //   if(newData.project_NAME !== undefined){
                //     newData.project_NAME = newData.project_NAME.toUpperCase();
                // }

                // if(newData.environment !== undefined){
                //     newData.environment = newData.environment.toUpperCase();
                // }

                // if(newData.os !== undefined){
                //     newData.os = newData.os.toUpperCase();
                // }

                // if (newData.location !== undefined){
                //     newData.location = newData.location.toUpperCase();
                // }

                // if (newData.power_STATUS!== undefined){
                //     newData.power_STATUS = newData.power_STATUS.toUpperCase();
                // }

                //   if(newData.project_NAME !== undefined ||newData.environment !== undefined || newData.os !==undefined || newData.location !== undefined || newData.power_STATUS!==undefined){
                //     newData.project_NAME = newData.project_NAME.toUpperCase();
                //     newData.environment = newData.environment.toUpperCase();
                //     newData.os = newData.os.toUpperCase();
                //     newData.location = newData.location.toUpperCase();
                //     newData.power_STATUS = newData.power_STATUS.toUpperCase();
                //   }

                //   console.log(newData);
                  addUpdateData(newData);
                  resolve();
                }, 1000)
              }),

            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                //   setData([...dataUpdate]);
                

                    console.log(newData.project_NAME == null);
                    
                    // if(newData.project_NAME !== null){
                    //     newData.project_NAME = newData.project_NAME.toUpperCase();
                    // }

                    // if(newData.environment !== null){
                    //     newData.environment = newData.environment.toUpperCase();
                    // }

                    // if(newData.os !== null){
                    //     newData.os = newData.os.toUpperCase();
                    // }

                    // if (newData.location !== null){
                    //     newData.location = newData.location.toUpperCase();
                    // }

                    // if (newData.power_STATUS!== null){
                    //     newData.power_STATUS = newData.power_STATUS.toUpperCase();
                    // }

                //   if(newData.project_NAME !== null || newData.environment !== null || newData.os !== null || newData.location !== null || newData.power_STATUS!== null){
                //     newData.project_NAME = newData.project_NAME.toUpperCase();
                //     newData.environment = newData.environment.toUpperCase();
                //     newData.os = newData.os.toUpperCase();
                //     newData.location = newData.location.toUpperCase();
                //     newData.power_STATUS = newData.power_STATUS.toUpperCase();
                //   }

                  addUpdateData(newData);
                //   setData(data);
                  resolve();
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                //   setData([...dataDelete]);
                  deleteData(oldData.sid);
                  resolve()
                }, 1000)
              }),
          }}
          style={{ maxHeight: '90vh', overflow: 'auto' }}
          className="table-container"
        //   actions={[{icon:()=><MdOutlineHideSource/>, onClick:()=> {setFilter(!filter); console.log(filter);}, isFreeAction:true}]}
        options={{pagination:false,filtering:true,exportButton:true,grouping:true,columnsButton:true,exportAllData:true,maxBodyHeight: '70vh',addRowPosition:"first",headerStyle:{fontSize:'13px'},cellStyle:{fontSize:'13px'}}}
        />
        </div>
        </div>
      )
}
)
export default MainTable