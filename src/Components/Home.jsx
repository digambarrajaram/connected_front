import React from 'react'
import "./Home.css"
import Header from './Header/Header'
import Card from './Card'
import { Link } from 'react-router-dom'



const Home = () => {
  return (
    <div className="App" style={{height:'100vh'}}>

    <div className='row' style={{height:'100vh',width:'100%'}}>
      <div className='col-2'>
      <Header />
      </div>
      <div className='col-10 d-flex justify-content-between align-items-center flex-column'>
          <div style={{marginTop:"5%"}}><h1>OSSG Deliverables</h1></div>
        <div className='container'>

        <div className='row d-flex justify-content-center align-items-center'>
          <div className='col-5 d-flex justify-content-center align-items-center'><Link to="linux" style={{textDecoration:'none',width:"95%",color:'black'}}><Card name={"Linux Inventory"}/></Link></div>
          <div className='col-5 d-flex justify-content-center align-items-center'><Link to="hardware" style={{textDecoration:'none',width:"95%",color:'black'}}><Card name={"Hardware Inventory"}/></Link></div>
        </div>
        <div className='row d-flex justify-content-center align-items-center'>
          <div className='col-5 d-flex justify-content-center align-items-center'><Link to="linux" style={{textDecoration:'none',width:"95%",color:'black'}}><Card name={"Wintel Inventory"}/></Link></div>
          <div className='col-5 d-flex justify-content-center align-items-center'><Link to="linux" style={{textDecoration:'none',width:"95%",color:'black'}}><Card name={"AIX Inventory"}/></Link></div>
        </div>
      </div>
        <div style={{marginBottom:"1%"}}> <p style={{color:"grey"}}> © Copyright Protean eGov Technologies Limited. All Rights Reserved</p></div>
      </div>
      </div>
  </div>
  )
}

export default Home