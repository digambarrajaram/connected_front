import React from 'react'
import Header from '../Header/Header'
import MainTable from './MainTable'

const LinuxChangeLog = ({setLogin}) => {
  return (
    <div className="App" style={{height:'100vh'}}>

    <div className='row' style={{height:'100vh'}}>
      <div className='col-2'>
      <Header setLogin={setLogin}/>
      </div>
      <div className='col-10 d-flex justify-content-between align-items-center flex-column'>
        <div className='container'>
            <MainTable/>
      </div>
      <div style={{marginTop:"1%"}}> <p style={{color:"grey"}}> © Copyright Protean eGov Technologies Limited. All Rights Reserved</p></div>

      </div>
      </div>
  </div>
  )
}

export default LinuxChangeLog;