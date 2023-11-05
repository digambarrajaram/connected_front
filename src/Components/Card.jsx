import React from 'react'
import "./Card.css"
const Card = ({name}) => {
  return (
    <>
    <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded new with-transform" style={{ width: '90%'}}>
  <div className="card-body">
    {/* <h5 className="card-title pt-4">{" "}</h5>
    <h6 className="card-subtitle mb-2 text-muted pt-3"></h6> */}
    <h2 className="card-title p-5 text-center" style={{fontSize:'30px'}}><i>{name}</i></h2>
    
  </div>
</div>
    </>
  )
}

export default Card