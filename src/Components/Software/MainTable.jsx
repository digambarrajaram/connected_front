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

    // var testing;

    
    // const [groupedData,setGroupData] = useState([]);


    // const [filter,setFilter] = useState(false);
    const addUpdateData = async (newData) =>{

      if(newData.sofid !== undefined){

        const previousData = await axios.get(`/inventory/softwarebyid/${newData.sofid}`);
        console.log(previousData.data);

        const differences = findDifferences(previousData.data, newData);
        const finalString = differences.join('\n')
        console.log(finalString);

        const postchange = await axios.post("/inventory/softwarechangelog",{
          "uniqueid":newData.sofid,
          "remark":finalString,
          "user":localStorage.getItem("username")
        });

        newData.approval_date = formatDate(newData.approval_date);
        newData.po_date = formatDate(newData.po_date);
        newData.asc_startdate = formatDate(newData.asc_startdate);
        newData.asc_enddate = formatDate(newData.asc_enddate);
        
        const serverdata = await axios.post("/inventory/addsoftware",newData);
        console.log(newData);
        console.log(serverdata.data);
        window.location.reload(true)

      }else{

        newData.approval_date = formatDate(newData.approval_date);
        newData.po_date = formatDate(newData.po_date);
        newData.asc_startdate = formatDate(newData.asc_startdate);
        newData.asc_enddate = formatDate(newData.asc_enddate);
        
        const serverdata = await axios.post("/inventory/addsoftware",newData);
        console.log(newData);
        console.log(serverdata.data);

        const lid = await axios.get(`inventory/getsofid`);
        console.log(lid.data);

        const postchange = await axios.post("/inventory/softwarechangelog",{
          "uniqueid":lid.data,
          "remark":`New Server Added  ==> ${newData.soft_name}`,
          "user":localStorage.getItem("username")
        });
        console.log(postchange);
        window.location.reload(true)

      }

        
    }

    // console.log(count);
    const deleteData = async (sid) => {

      const postchange = await axios.post("/inventory/softwarechangelog",{
        "uniqueid":sid,
        "remark":`Server Deleted`,
        "user":localStorage.getItem("username")
      });

        const deleteserverdata = await axios.post(`/inventory/deletesoftware/${sid}`);
        console.log(deleteserverdata.data);
        window.location.reload(true) 
        // getdata();
    }

    // const test = () =>{
    //   const bl = {};
    //   const arr = ['NA','Pune-DC',"BLR-DC","NDR-DC"];
      
    //   arr.map((val)=>{
    //     Object.assign(bl,{[val]:val},bl);
    //   })

    //   return bl;
    // }

    // test();

    const getdata = async () => {
  
      const response = await axios.get(`/inventory/softwarelist/${false}`);
      
  
      // console.log(response.data[0].location);
  
      setData(response.data);
      // getListData();

      // console.log(locresponse.data);

      // testing = [...new Set(response.data.map(item => item.location))];
    }

    

    // console.log(loc);
    
    useEffect(() => {
    
    getdata();
    const getListData = async () =>{
      const locresponse = await axios.get(`/inventory/location`);
      setLoc(await locresponse.data);
      console.log(locresponse.data);
    }
    getListData();
  }, [])
  
  // console.log(loc);

  


  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  const finyear = ['2020-21','2021-22',"2022-23","2023-24","2024-25","2025-26","2026-27","2027-28","2028-29","2029-30"];
  // const location = ['NA','Pune-DC',"BLR-DC","NDR-DC","Mumbai"];
  const ascrenew = ["ASC-Renewal","Purchase"];
  // const laoc = loc;
  // const modelno = ['Dell Power Edge R730','Dell PowerEdge R7515',
  // 'Dell PowerEdge R730xd',
  // 'Lenovo Thinksystem SR550',
  // 'Dell PowerEdge R540',
  // 'Dell PowerEdge R7515'
  // ]

  // const projectl = ['CRA',
  // 'TIN',
  // 'Common\n(VKP,e-Sign,DOT,Hosting)',
  // 'Hosting',
  // 'IT Infra',
  // 'GST',
  // 'Common',
  // 'Admin',
  // 'CRA UAT/Dev',
  // ]
  // const amcwar = ['NA','AMC',"Warranty"];
  // const insurance = ['NA','YES',"NO"];
  // const socketno = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

const columnStyles = {
  assetno: {width: '50px'}
};

  // const osdetails = ['NA','SUSE', 'UBUNTU','REDHAT'];
// eslint-disable-next-line
    const [columns, setColumns] = useState([
        {
            title: 'No.',
            render: (rowData) => rowData.tableData.id + 1,
            // editable: 'never',
          },
          { title: 'UniqueId', field: 'sofid', emptyValue:() => <em>NA</em>,editable:'never' },
        { title: 'Software Name', field: 'soft_name', emptyValue:() => <em>NA</em> },
        { title: 'Approval No.', field: 'approval_no', emptyValue:() => <em>NA</em>},
        { title: 'Approval Date', field: 'approval_date', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <input
            type="date"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className='datecs'
          />
        ),
        },
        { title: 'PO No.', field: 'po_no', emptyValue:() => <em>NA</em>},
        { title: 'PO Date', field: 'po_date', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <input
            type="date"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className='datecs'
          />
        ),
        },
        { title: 'ASC St.Date', field: 'asc_startdate', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <input
            type="date"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className='datecs'
          />
        ),
        },
        { title: 'ASC END Date', field: 'asc_enddate', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <input
            type="date"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className='datecs'
          />
        ),
        },
        { title: 'Renewal', field: 'renewal', emptyValue:() => <em>NA</em>,
        lookup: ascrenew.reduce((acc,lo)=>{
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
            {ascrenew.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Vendor', field: 'vendor_name', emptyValue:() => <em>NA</em>},
        { title: 'No.of.LIC', field: 'no_of_lic', emptyValue:() => <em>NA</em>},
        { title: 'Financial Yr', field: 'fin_year', emptyValue:() => <em>NA</em>,
        lookup: finyear.reduce((acc,lo)=>{
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
            {finyear.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Approval WFMS No.', field: 'app_wfms_no', emptyValue:() => <em>NA</em>},
        { title: 'PO WFMS', field: 'po_wfms_no', emptyValue:() => <em>NA</em>},
        { title: 'Remark', field: 'remark', emptyValue:() => <em>NA</em>},
      ]);
    
        const bannername = `Software Inventory`

      return (
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{paddingRight:"0"}}>

            <div className='mt-1' style={{width:"100%"}}>
        <MaterialTable
          title={bannername}
          columns={columns.map((col)=>({
            ...col,
            cellstyle: columnStyles[col.field],
            headerStyle: columnStyles[col.field],
          }))}
          icons={tableIcons}
          data={data}
          editable={{
            onRowAdd: newData =>
            new Promise((resolve, reject) => {
                  
                setTimeout(() => {
                  // setData([...data, newData]);
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
                  // setData([...dataUpdate]);

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
                  deleteData(oldData.sofid);
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