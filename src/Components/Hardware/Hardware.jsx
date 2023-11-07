import React from 'react'
import MainTable from './MainTable'
import Header from '../Header/Header'

const Hardware = () => {
  return (
    <div className="App" style={{height:'100vh'}}>

    <div className='row' style={{height:'100vh'}}>
      <div className='col-2'>
      <Header />
      </div>
      <div className='col-10 d-flex justify-content-center align-items-center'>
        <div className='container'>
            <MainTable/>
      </div>
      </div>
      </div>
  </div>
  )
}

export default Hardware