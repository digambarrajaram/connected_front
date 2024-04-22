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
import { useParams, useSearchParams } from 'react-router-dom';

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

    const {id} = useParams();

    const getdata = async (id) => {
      // console.log(id)
      const response = await axios.get(`/inventory/downloadinfo/${id}`);
  
      setData(response.data)

      console.log(response.data);
    }

    // const id = this.props.match.params.id;
      // console.log(id);

    useEffect(() => {
    
    getdata(id);
  }, [])


  const downloadfile = async (event,rowdata) => {

    try {
    //   const response = await axios.get(`/inventory/download/${rowdata.sofid}`);
    // console.log(response.data);
    window.open(`http://localhost:8080/inventory${rowdata.downloadUri}`,'_blank');
    } catch (error) {
      console.log("Got Some error");
    }

    console.log(rowdata);
    
  }
  

// eslint-disable-next-line
const [columns, setColumns] = useState([
  {
      title: 'No.',
      render: (rowData) => rowData.tableData.id + 1,
      editable: 'never',
    },
    // { title: 'UniqueId', field: 'fid', emptyValue:() => <em>NA</em> },
  { title: 'Filename', field: 'filename', emptyValue:() => <em>NA</em> },
  { title: 'User', field: 'user', emptyValue:() => <em>NA</em>},
  { title: 'Change Time', field: 'mtime', emptyValue:() => <em>NA</em>},
  
]);
  
return (
  <div className='container-fluid d-flex justify-content-center align-items-center' style={{paddingRight:"0"}}>
      <div className='mt-1' style={{width:"100%"}}>
  <MaterialTable
    title="Download Files"
    columns={columns}
    icons={tableIcons}
    data={data}
    actions={[{
      icon:'⇓',
      tooltip:'Download File',
      onClick: (e,rowdata) => {downloadfile(e,rowdata)}
    }]}
  options={{pagination:false,filtering:true,exportButton:true,grouping:true,columnsButton:true,exportAllData:true,maxBodyHeight: '70vh',addRowPosition:"first",headerStyle:{fontSize:'13px'},cellStyle:{fontSize:'13px'}}}
  />
  </div>
  </div>
)
}

export default MainTable