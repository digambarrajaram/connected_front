import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'
// import { MdOutlineHideSource } from "react-icons/md";
import "./MainTable.css";


const MainTable = () => {

    const [data,setData] = useState([]);

    const getdata = async () => {
  
      const response = await axios.get(`/inventory/hardwarechangelogslist`);
  
      setData(response.data)
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
    { title: 'UniqueId', field: 'uniqueid', emptyValue:() => <em>NA</em> },
  { title: 'Remarks', field: 'remark', emptyValue:() => <em>NA</em> },
  { title: 'User', field: 'user', emptyValue:() => <em>NA</em>},
  { title: 'Change Time', field: 'mtime', emptyValue:() => <em>NA</em>},
  
]);
  
return (
  <div className='container-fluid d-flex justify-content-center align-items-center'>
      <div className='mt-1' style={{width:"100%"}}>
  <MaterialTable
    title="Hardware Change Log"
    columns={columns}
    data={data}
  options={{pagination:false,filtering:true,exportButton:true,grouping:true,columnsButton:true,exportAllData:true,maxBodyHeight: '70vh',addRowPosition:"first",headerStyle:{fontSize:'13px'},cellStyle:{fontSize:'13px'}}}
  />
  </div>
  </div>
)
}

export default MainTable