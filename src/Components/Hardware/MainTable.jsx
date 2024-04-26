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

      if(newData.hid !== undefined){

        const previousData = await axios.get(`/inventory/hardwarebyid/${newData.hid}`);
        console.log(previousData.data);

        const differences = findDifferences(previousData.data, newData);
        const finalString = differences.join('\n')
        console.log(finalString);

        const postchange = await axios.post("/inventory/hardwarechangelog",{
          "uniqueid":newData.hid,
          "remark":finalString,
          "user":localStorage.getItem("username")
        });

        newData.podate = formatDate(newData.podate);
        newData.approvaldate = formatDate(newData.approvaldate);
        newData.warstdate = formatDate(newData.warstdate);
        newData.wareddate = formatDate(newData.wareddate);
        newData.amcstdate = formatDate(newData.amcstdate);
        newData.amceddate = formatDate(newData.amceddate);
        newData.expdate = formatDate(newData.expdate);
        newData.principaleosupport = formatDate(newData.principaleosupport);
        newData.principaleoservice = formatDate(newData.principaleoservice);
        newData.totalcores = newData.corepercpu * newData.socket;
        
        const serverdata = await axios.post("/inventory/addhardware",newData);
        console.log(newData);
        console.log(serverdata.data);
        window.location.reload(true)

      }else{

        newData.podate = formatDate(newData.podate);
        newData.approvaldate = formatDate(newData.approvaldate);
        newData.warstdate = formatDate(newData.warstdate);
        newData.wareddate = formatDate(newData.wareddate);
        newData.amcstdate = formatDate(newData.amcstdate);
        newData.amceddate = formatDate(newData.amceddate);
        newData.expdate = formatDate(newData.expdate);
        newData.principaleosupport = formatDate(newData.principaleosupport);
        newData.principaleoservice = formatDate(newData.principaleoservice);
        newData.totalcores = newData.corepercpu * newData.socket;
        
        const serverdata = await axios.post("/inventory/addhardware",newData);
        console.log(newData);
        console.log(serverdata.data);

        const lid = await axios.get(`inventory/gethid`);
        console.log(lid.data);

        const postchange = await axios.post("/inventory/hardwarechangelog",{
          "uniqueid":lid.data,
          "remark":`New Server Added Asset No ==> ${newData.assetno}`,
          "user":localStorage.getItem("username")
        });
        console.log(postchange);
        window.location.reload(true)

      }

        
    }

    // console.log(count);
    const deleteData = async (sid) => {

      const postchange = await axios.post("/inventory/hardwarechangelog",{
        "uniqueid":sid,
        "remark":`Server Deleted`,
        "user":localStorage.getItem("username")
      });

        const deleteserverdata = await axios.post(`/inventory/deletehardware/${sid}`);
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
  
      const response = await axios.get(`/inventory/hardwarelist/${false}`);
      
  
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

  const os = ['NA',"HSM","ESX","KVM","Open-SUSE 42 sp3","RHEL 7.2","SUSE 12SP2","TL","Windows"];
  const categories1 = ["NA","Intel Server ","San Switch","Storage","P-series Server","HSM"];
  const oem = ["NA","DellEMC ","IBM"];
  const location = ['NA','PUNE',"BLR","PUNE NDC","Pune-NDR","Mumbai"];
  // const laoc = ["Pune-DC","BLR-DC","Mumbai"];
  // const laoc = loc;
  const modelno = ['Dell Power Edge R730','Dell PowerEdge R7515',
  'Dell PowerEdge R730xd',
  'Lenovo Thinksystem SR550',
  'Dell PowerEdge R540',
  'Dell PowerEdge R7515'
  ]

  const projectl = [
  'CRA',
  'TIN',
  'Common\n(VKP,e-Sign,DOT,Hosting)',
  'Hosting',
  'IT Infra',
  'GST',
  'Common',
  'Admin',
  'CRA UAT/Dev',
  "CBFC",
  "Common (FS9150-SAN-SW)",
  "Common (Hosting)",
  "Common (NDR)",
  "CRA, GST",
  "eSign",
  "VS"
  ]
  const amcwar = ['NA','AMC',"Warranty","e-waste ","Warranty + AMC"];
  const insurance = ['NA','YES',"NO"];
  const socketno = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

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
          { title: 'UniqueId', field: 'hid', emptyValue:() => <em>NA</em>,editable:'never' },
          { title: 'Hardware Category', field: 'hardwarecategory', emptyValue:() => <em>NA</em>,
          lookup: categories1.reduce((acc,lo)=>{
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
              {categories1.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          ),},

          { title:'OEM', field: 'oem', emptyValue:() => <em>NA</em>,
          lookup: oem.reduce((acc,lo)=>{
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
              {oem.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          ),},
          { title: 'Vendor Name', field: 'vdamcname', emptyValue:() => <em>NA</em>},
          { title: 'AMC/Warranty', field: 'awe', emptyValue:() => <em>NA</em>,
          lookup: amcwar.reduce((acc,lo)=>{
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
              {amcwar.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          ),},
        { title: 'Asset No.', field: 'assetno', emptyValue:() => <em>NA</em> },
        { title: 'Device Serial No.', field: 'serialno', emptyValue:() => <em>NA</em>},
        { title: 'Physical Ip', field: 'ilophysicalip', emptyValue:() => <em>NA</em>},
        { title: 'Type/OS', field: 'typeoros', emptyValue:() => <em>NA</em>,
          lookup: os.reduce((acc,lo)=>{
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
              {os.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          ),},
        { title: 'Model A.', field: 'modela', emptyValue:() => <em>NA</em>,
        // lookup: modelno.reduce((acc,lo)=>{
        //   // console.log(lo);
        //   acc[lo] = lo;
        //   // console.log(acc);
        //   return acc;
        // },{}),
        // editComponent: (props) => (
        //   <select
        //     value={props.value}
        //     onChange={(e) => props.onChange(e.target.value)}
        //     style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
        //   >
        //     {modelno.map((category) => (
        //       <option key={category} value={category}>
        //         {category}
        //       </option>
        //     ))}
        //   </select>
        // ),
      },
        { title: 'CPU Series', field: 'cpuseries', emptyValue:() => <em>NA</em>},

        { title: 'Project Name', field: 'project', emptyValue:() => <em>NA</em>,
        lookup: projectl.reduce((acc,lo)=>{
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
            {projectl.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},

        { title: 'Location', field: 'location', emptyValue:() => <em>NA</em>, 
        lookup:location.reduce((acc,lo)=>{
          // console.log(lo);
          acc[lo] = lo;
          // console.log(acc);
          return acc;
        },{}),
        // lookup:loc.reduce((acc,lo)=>{
        //   acc[lo] = lo;
        //   return acc;
        // },{}),   
        // lookup: {'Pune-DC':'Pune-DC',"BLR-DC":"BLR-DC","NDR-DC":"NDR-DC"},
        // lookup: loc,

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
        { title: 'Socket', field: 'socket', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {socketno.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Core per socket', field: 'corepercpu', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <select
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            style={{padding:'3px',background:'white', outline:'none',border:'none',borderBottom:'1px solid'}}
          >
            {socketno.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Total Cores', field: 'totalcores',
        render: (rowData) => rowData.socket * rowData.corepercpu,
        editable: 'never',
        },
        { title: 'Memory (GB)', field: 'memory', emptyValue:() => <em>NA</em>},
        { title: 'Physical HDD (GB)', field: 'physicalhdd', emptyValue:() => <em>NA</em>},
        { title: 'Approval No.', field: 'approvalno', emptyValue:() => <em>NA</em>},
        { title: 'Approval Date', field: 'approvaldate', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <input
            type="date"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className='datecs'
          />
        ),},
        { title: 'Approval WFMS No.', field: 'approvalwfmsno', emptyValue:() => <em>NA</em>},
        { title: 'PO No', field: 'pono', emptyValue:() => <em>NA</em>},
        { title: 'PO Date   ', field: 'podate', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <input
            type="date"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}g
            className='datecs'
          />
        ),
        },
        { title: 'PO WFMS No.', field: 'powfmsno', emptyValue:() => <em>NA</em>},
        { title: 'Warranty Start', field: 'warstdate', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <input
            type="date"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className='datecs'
          />
        ),},
        { title: 'Warranty End', field: 'wareddate', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <input
            type="date"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className='datecs'
          />
        ),},
        { title: 'AMC Start', field: 'amcstdate', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <input
            type="date"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className='datecs'
          />
        ),},
        { title: 'AMC End', field: 'amceddate', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <input
            type="date"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className='datecs'
          />
        ),},
        // { title: 'Expiry', field: 'expdate', emptyValue:() => <em>NA</em>,
        // editComponent: (props) => (
        //   <input
        //     type="date"
        //     value={props.value}
        //     onChange={(e) => props.onChange(e.target.value)}
        //     className='datecs'
        //   />
        // ),},
       
        { title: 'Device Insurance', field: 'deviceinsurance', emptyValue:() => <em>NA</em>,
        lookup: insurance.reduce((acc,lo)=>{
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
            {insurance.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ),},
        { title: 'Principal End of Support', field: 'principaleosupport', emptyValue:() => <em>NA</em>,
        editComponent: (props) => (
          <input
            type="date"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className='datecs'
          />
        ),},
        // { title: 'Principal End of Service', field: 'principaleoservice', emptyValue:() => <em>NA</em>,
        // editComponent: (props) => (
        //   <input
        //     type="date"
        //     value={props.value}
        //     onChange={(e) => props.onChange(e.target.value)}
        //     className='datecs'
        //   />
        // ),},
        { title: 'Machine Type', field: 'machinetype', emptyValue:() => <em>NA</em>},
        { title: 'ModelB', field: 'modelb', emptyValue:() => <em>NA</em>},
        { title: 'Remark', field: 'remark', emptyValue:() => <em>NA</em>},

        
      ]);
    

      return (
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{paddingRight:"0"}}>

            <div className='mt-1' style={{width:"100%"}}>
        <MaterialTable
          title="Hardware Inventory"
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