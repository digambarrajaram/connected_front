import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'
// import { MdOutlineHideSource } from "react-icons/md";
import "./MainTable.css";


const MainTable = React.memo(() => {

    const [data,setData] = useState([]);

    const getdata = async () => {
  
      const response = await axios.get(`/inventory/serverlist/${true}`);
  
      console.log(response.data);
  
      setData(response.data);
    }
    
  useEffect(() => {
    getdata();
  }, [])


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
        { title: 'Project Name', field: 'project_NAME', emptyValue:() => <em>NA</em>},
        {
          title: 'Environment',
          field: 'environment',},
        // { title: 'Environment', field: 'environment', emptyValue:() => <em>NA</em>, filtering:"multi-select"},
        { title: 'OS', field: 'os', emptyValue:() => <em>NA</em>},
        { title: 'Location', field: 'location', emptyValue:() => <em>NA</em>},
        { title: 'Support Status', field: 'support_STATUS', emptyValue:() => <em>NA</em>},
        { title: 'Owner', field: 'owner', emptyValue:() => <em>NA</em>},
      ]);
    
      return (
        <div className='container-fluid d-flex justify-content-center align-items-center'>
            <div className='mt-1' style={{width:"100%"}}>
        <MaterialTable
          title="Linux Power Off"
          columns={columns}
          data={data}
          style={{ maxHeight: '90vh', overflow: 'auto' }}
        //   actions={[{icon:()=><MdOutlineHideSource/>, onClick:()=> {setFilter(!filter); console.log(filter);}, isFreeAction:true}]}
        options={{pagination:false,filtering:true,exportButton:true,grouping:true,columnsButton:true,exportAllData:true,maxBodyHeight: '70vh',addRowPosition:"first",headerStyle:{fontSize:'13px'},cellStyle:{fontSize:'13px'}}}
        />
        </div>
        </div>
      )
}
)
export default MainTable