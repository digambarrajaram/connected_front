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
  
      const response = await axios.get(`/inventory/softwarelist/${true}`);
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
          { title: 'UniqueId', field: 'sofid', emptyValue:() => <em>NA</em>,editable:'never' },
        { title: 'Name', field: 'soft_name', emptyValue:() => <em>NA</em> },
        { title: 'Approval No.', field: 'approval_no', emptyValue:() => <em>NA</em>},
        { title: 'Approval Date', field: 'approval_date', emptyValue:() => <em>NA</em>},
        { title: 'PO No.', field: 'po_no', emptyValue:() => <em>NA</em>},
        { title: 'PO Date', field: 'po_date', emptyValue:() => <em>NA</em>},
        { title: 'ASC St.Date', field: 'asc_startdate', emptyValue:() => <em>NA</em>},
        { title: 'ASC Ed.Date', field: 'asc_enddate', emptyValue:() => <em>NA</em>},
        { title: 'No.of.LIC', field: 'no_of_lic', emptyValue:() => <em>NA</em>},
        { title: 'Financial Yr', field: 'fin_year', emptyValue:() => <em>NA</em>},
      ]);
    

      return (
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{paddingRight:"0"}}>

            <div className='mt-1' style={{width:"100%"}}>
        <MaterialTable
          title="Software PoweredOff Inventory"
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