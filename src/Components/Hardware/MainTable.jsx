import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'
// import { MdOutlineHideSource } from "react-icons/md";
import "./MainTable.css";


const MainTable = () => {

    const [data,setData] = useState([]);

    // const [filter,setFilter] = useState(false);
    const addUpdateData = async (newData) =>{
        const serverdata = await axios.post("/inventory/addhardware",newData);
        console.log(serverdata.data); 
        window.location.reload(true) 
    }

    const deleteData = async (sid) => {
        const deleteserverdata = await axios.post(`/inventory/deletehardware/${sid}`);
        console.log(deleteserverdata.data);
        window.location.reload(true) 
    }

    const getdata = async () => {
  
      const response = await axios.get(`/inventory/hardwarelist`);
  
      // console.log(response.data);
  
      setData(response.data);
    }
    
  useEffect(() => {
    getdata();
  }, [])

  const categories = ['NA','Intel',"AMD","SAN Switch","Storage","P-Series","HMC"];
  const location = ['NA','Pune-DC',"BLR-DC","NDR-DC"];
  const amcwar = ['NA','AMC',"Warranty"];
  const insurance = ['NA','Yes',"No"];



  // const osdetails = ['NA','SUSE', 'UBUNTU','REDHAT'];
// eslint-disable-next-line
    const [columns, setColumns] = useState([
        {
            title: 'No.',
            render: (rowData) => rowData.tableData.id + 1,
            editable: 'never',
          },
          
        { title: 'Asset No.', field: 'assetno', emptyValue:() => <em>NA</em> },
        { title: 'Device Sr.', field: 'deviceserialno', emptyValue:() => <em>NA</em>},
        { title: 'ILO/Physical Ip', field: 'ilophysicalip', emptyValue:() => <em>NA</em>},
        { title: 'Device Type', field: 'devicetype', emptyValue:() => <em>NA</em>,
          lookup: {'Intel':"Intel","AMD":"AMD","SAN Switch":"SAN Switch","Storage":"Storage","P-Series":"P-Series","HMC":"HMC"},
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
          ),},
        { title: 'Model No.', field: 'modelno', emptyValue:() => <em>NA</em>},
        { title: 'CPU Series', field: 'cpuseries', emptyValue:() => <em>NA</em>},

        { title: 'Project Name', field: 'project', emptyValue:() => <em>NA</em>},
        // {
        //   title: 'Environment',
        //   field: 'environment',
        //   lookup: {'PROD':'PROD','TEST':'TEST'},
        //   editComponent: (props) => (
        //     <select
        //       value={props.value}
        //       onChange={(e) => props.onChange(e.target.value)}
        //       style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
        //     >
        //       {categories.map((category) => (
        //         <option key={category} value={category}>
        //           {category}
        //         </option>
        //       ))}
        //     </select>
        //   ),
          
        // },
      //   { title: 'OS', field: 'os', emptyValue:() => <em>NA</em>,lookup:{'SUSE':'SUSE','UBUNTU':'UBUNTU','REDHAT':'REDHAT'},
      //   editComponent: (props) => (
      //     <select
      //       value={props.value}
      //       onChange={(e) => props.onChange(e.target.value)}
      //       style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
      //     >
      //       {osdetails.map((category) => (
      //         <option key={category} value={category}>
      //           {category}
      //         </option>
      //       ))}
      //     </select>
      //   ),
      // },
        { title: 'Location', field: 'location', emptyValue:() => <em>NA</em>,     
        lookup: {'Pune-DC':'Pune-DC',"BLR-DC":"BLR-DC","NDR-DC":"NDR-DC"},
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {location.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Socket', field: 'socket', emptyValue:() => <em>NA</em>},
        { title: 'Core per socket', field: 'corepercpu', emptyValue:() => <em>NA</em>},
        { title: 'Total Cores', field: 'totalcores', emptyValue:() => <em>NA</em>},
        { title: 'Memory', field: 'memory', emptyValue:() => <em>NA</em>},
        { title: 'Physical HDD', field: 'physicalhdd', emptyValue:() => <em>NA</em>},
        { title: 'App No.', field: 'approvalno', emptyValue:() => <em>NA</em>},
        { title: 'App Date', field: 'approvaldate', emptyValue:() => <em>NA</em>},
        { title: 'PO No', field: 'pono', emptyValue:() => <em>NA</em>},
        { title: 'PO Date', field: 'podate', emptyValue:() => <em>NA</em>},
        { title: 'AMC/Warranty', field: 'devamcwar', emptyValue:() => <em>NA</em>,
        lookup: {'AMC':'AMC',"Warranty":"Warranty"},
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {amcwar.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Warranty Start', field: 'warstdate', emptyValue:() => <em>NA</em>},
        { title: 'Warranty End', field: 'wareddate', emptyValue:() => <em>NA</em>},
        { title: 'AMC Start', field: 'amcstdate', emptyValue:() => <em>NA</em>},
        { title: 'AMC End', field: 'amceddate', emptyValue:() => <em>NA</em>},
        { title: 'Expiry', field: 'expdate', emptyValue:() => <em>NA</em>},
        { title: 'Vendor AMC Name', field: 'vdamcname', emptyValue:() => <em>NA</em>},
        { title: 'Device Insurance', field: 'deviceinsurance', emptyValue:() => <em>NA</em>,
        lookup: {'Yes':'Yes',"No":"No"},
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {insurance.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Principal End of Support', field: 'principaleosupport', emptyValue:() => <em>NA</em>},
        { title: 'Principal End of Service', field: 'principaleoservice', emptyValue:() => <em>NA</em>},












      ]);
    
    
      return (
        <div className='container-fluid d-flex justify-content-center align-items-center'>
            <div className='mt-1' style={{width:"100%"}}>
        <MaterialTable
          title="Hardware Inventory"
          columns={columns}
          data={data}
          editable={{
            onRowAdd: newData =>
            new Promise((resolve, reject) => {
                  
                setTimeout(() => {
                //   if(newData.assetno !== undefined){
                //     newData.assetno = newData.assetno.toUpperCase();
                // }

                // if(newData.deviceserialno !== undefined){
                //     newData.deviceserialno = newData.deviceserialno.toUpperCase();
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
                

                    // console.log(newData.project_NAME == null);
                    
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
                  deleteData(oldData.hid);
                  resolve()
                }, 1000)
              }),
          }}
          style={{ maxHeight: '90vh', overflow: 'auto' }}
        //   actions={[{icon:()=><MdOutlineHideSource/>, onClick:()=> {setFilter(!filter); console.log(filter);}, isFreeAction:true}]}
        options={{pagination:false,filtering:true,exportButton:true,grouping:true,columnsButton:true,exportAllData:true,maxBodyHeight: '70vh',addRowPosition:"first",headerStyle:{fontSize:'13px'},cellStyle:{fontSize:'13px'}}}
        />
        </div>
        </div>
      )
}

export default MainTable