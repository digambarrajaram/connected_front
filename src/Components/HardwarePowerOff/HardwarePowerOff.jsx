import React from 'react'
import MainTable from './MainTable'
import Header from '../Header/Header'

const HardwarePowerOff = ({setLogin}) => {
  
  return (
    <div className="App" style={{height:'100vh'}}>

    <div className='row' style={{height:'100vh',width:'100%'}}>
      <div className='col'>
      <Header setLogin={setLogin} path="hardwarechangelog" path2="hardwarepoweroff"/>
      </div>
      <div className='col-12 d-flex justify-content-between align-items-center flex-column' style={{width:"98vw"}}>
        <div className='container-fluid' style={{paddingRight:"0"}}>
            <MainTable/>
      </div>
      <div style={{marginTop:"1%"}}> <p style={{color:"grey"}}> © Copyright Protean eGov Technologies Limited. All Rights Reserved</p></div>
      </div>
      </div>
  </div>
  )
}

export default HardwarePowerOff