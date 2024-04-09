import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'
// import { MdOutlineHideSource } from "react-icons/md";
import "./MainTable.css";
import * as Icons from '@material-ui/icons'
import FilterAltIcon from '@material-ui/icons/FilterList';
import GetApp from '@material-ui/icons/GetApp';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const MainTable = () => {

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
    const [loc,setLoc] = useState([]);


    const getdata = async () => {
  
      const response = await axios.get(`/inventory/hardwarelist/${true}`);
        setData(response.data);
    }

    
    useEffect(() => {
    
    getdata();
    const getListData = async () =>{
      const locresponse = await axios.get(`/inventory/location`);
      setLoc(await locresponse.data);
      console.log(locresponse.data);
    }
    getListData();
  }, [])
  

// eslint-disable-next-line
    const [columns, setColumns] = useState([
        {
            title: 'No.',
            render: (rowData) => rowData.tableData.id + 1,
            // editable: 'never',
          },
          { title: 'UniqueId', field: 'hid', emptyValue:() => <em>NA</em>,editable:'never' },
        { title: 'Asset No.', field: 'assetno', emptyValue:() => <em>NA</em> },
        { title: 'Device Serial No.', field: 'deviceserialno', emptyValue:() => <em>NA</em>},
        { title: 'ILO/Physical Ip', field: 'ilophysicalip', emptyValue:() => <em>NA</em>},
        { title: 'Device Type', field: 'devicetype', emptyValue:() => <em>NA</em>,},
        { title: 'Model No.', field: 'modelno', emptyValue:() => <em>NA</em>,},
        { title: 'CPU Series', field: 'cpuseries', emptyValue:() => <em>NA</em>},

        { title: 'Project Name', field: 'project', emptyValue:() => <em>NA</em>,},

        { title: 'Location', field: 'location', emptyValue:() => <em>NA</em>},
        { title: 'Socket', field: 'socket', emptyValue:() => <em>NA</em>},
        { title: 'Core per socket', field: 'corepercpu', emptyValue:() => <em>NA</em>},
        { title: 'Total Cores', field: 'totalcores',},
        { title: 'PO No', field: 'pono', emptyValue:() => <em>NA</em>},
        { title: 'PO Date   ', field: 'podate', emptyValue:() => <em>NA</em>},
        { title: 'AMC/Warranty', field: 'devamcwar', emptyValue:() => <em>NA</em>,},
        { title: 'Warranty Start', field: 'warstdate', emptyValue:() => <em>NA</em>},
        { title: 'Warranty End', field: 'wareddate', emptyValue:() => <em>NA</em>},
        { title: 'AMC Start', field: 'amcstdate', emptyValue:() => <em>NA</em>},
        { title: 'AMC End', field: 'amceddate', emptyValue:() => <em>NA</em>},
        { title: 'Expiry', field: 'expdate', emptyValue:() => <em>NA</em>},
        { title: 'Vendor AMC Name', field: 'vdamcname', emptyValue:() => <em>NA</em>},
        { title: 'Device Insurance', field: 'deviceinsurance', emptyValue:() => <em>NA</em>},
        { title: 'Principal End of Support', field: 'principaleosupport', emptyValue:() => <em>NA</em>},
      ]);
    

      return (
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{paddingRight:"0"}}>

            <div className='mt-1' style={{width:"100%"}}>
        <MaterialTable
          title="Hardware Inventory"
          columns={columns}
          icons={tableIcons}
          data={data}
          
          style={{ maxHeight: '90vh', overflow: 'auto' }}
        //   actions={[{icon:()=><MdOutlineHideSource/>, onClick:()=> {setFilter(!filter); console.log(filter);}, isFreeAction:true}]}
        options={{pagination:false,filtering:true,exportButton:true,grouping:true,columnsButton:true,exportAllData:true,maxBodyHeight: '70vh',addRowPosition:"first",headerStyle:{fontSize:'13px'},cellStyle:{fontSize:'13px'}}}
        />
        </div>
        </div>
      )
}

export default MainTable