import React from 'react'
import Header from '../Header/Header'
import ChangelogHome from '../ChangelogHome'

const Changelog = () => {
  return (
    <div className="App" style={{height:'100vh'}}>

    <div className='row' style={{height:'100vh'}}>
      <div className='col-2'>
      <Header />
      </div>
      <div className='col-10 d-flex justify-content-center align-items-center'>
        <div className='container'>
            <ChangelogHome/>
      </div>
      </div>
      </div>
  </div>
  )
}

export default Changelog