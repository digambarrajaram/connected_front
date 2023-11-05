import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'
// import { MdOutlineHideSource } from "react-icons/md";



const MainTable = () => {

    const [data,setData] = useState([]);

    // const [filter,setFilter] = useState(false);
    const addUpdateData = async (newData) =>{
        const serverdata = await axios.post("/inventory/addserver",newData);
        console.log(serverdata.data); 
        window.location.reload(true) 
    }

    const deleteData = async (sid) => {
        const deleteserverdata = await axios.post(`/inventory/deleteserver/${sid}`);
        console.log(deleteserverdata.data);
        window.location.reload(true) 
    }

    const getdata = async () => {
  
      const response = await axios.get(`/inventory/serverlist`);
  
      // console.log(response.data);
  
      setData(response.data);
    }
    
  useEffect(() => {
    getdata();
  }, [])

    const [columns, setColumns] = useState([
        {
            title: 'No.',
            render: (rowData) => rowData.tableData.id + 1,
            editable: 'never',
          },
        { title: 'Server Name', field: 'server_NAME', emptyValue:() => <em>NA</em> },
        { title: 'Physical IP', field: 'physical_IP', emptyValue:() => <em>NA</em>},
        { title: 'Project Name', field: 'project_NAME', emptyValue:() => <em>NA</em>},
        { title: 'Environment', field: 'environment', emptyValue:() => <em>NA</em>, filtering:"multi-select"},
        { title: 'OS', field: 'os', emptyValue:() => <em>NA</em>},
        { title: 'Location', field: 'location', emptyValue:() => <em>NA</em>},
        { title: 'Power Status', field: 'power_STATUS', emptyValue:() => <em>NA</em>},
        // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        // {
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
        <div className='container-fluid d-flex justify-content-center align-items-center'>
            <div className='mt-1'>
        <MaterialTable
          title="Linux Inventory"
          columns={columns}
          data={data}
          editable={{
            onRowAdd: newData =>
            new Promise((resolve, reject) => {
                  
                setTimeout(() => {
                //   setData([...data, newData]);
                  if(newData.project_NAME !== undefined){
                    newData.project_NAME = newData.project_NAME.toUpperCase();
                }

                if(newData.environment !== undefined){
                    newData.environment = newData.environment.toUpperCase();
                }

                if(newData.os !== undefined){
                    newData.os = newData.os.toUpperCase();
                }

                if (newData.location !== undefined){
                    newData.location = newData.location.toUpperCase();
                }

                if (newData.power_STATUS!== undefined){
                    newData.power_STATUS = newData.power_STATUS.toUpperCase();
                }

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
                    
                    if(newData.project_NAME !== null){
                        newData.project_NAME = newData.project_NAME.toUpperCase();
                    }

                    if(newData.environment !== null){
                        newData.environment = newData.environment.toUpperCase();
                    }

                    if(newData.os !== null){
                        newData.os = newData.os.toUpperCase();
                    }

                    if (newData.location !== null){
                        newData.location = newData.location.toUpperCase();
                    }

                    if (newData.power_STATUS!== null){
                        newData.power_STATUS = newData.power_STATUS.toUpperCase();
                    }

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
        //   actions={[{icon:()=><MdOutlineHideSource/>, onClick:()=> {setFilter(!filter); console.log(filter);}, isFreeAction:true}]}
        options={{pagination:false,filtering:true,exportButton:true,grouping:true,columnsButton:true,exportAllData:true,maxBodyHeight: '70vh',}}
        />
        </div>
        </div>
      )
}

export default MainTable