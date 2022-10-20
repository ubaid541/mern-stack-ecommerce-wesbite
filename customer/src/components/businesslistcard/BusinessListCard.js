import React from 'react'
import { Row } from 'react-bootstrap'

const BusinessListCard = () => {
  return (
    <>
    <Row>
      <div className="card card-style mx-4" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">Business Name</h5>
          <ul className="list-group list-group-flush my-4">
            <li className="list-group-item d-flex justify-content-between">
              <h6 className="fw-bold">City</h6>
              <p>Businesses City</p>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <h6 className="fw-bold">Type</h6>
              <p>Business Type</p>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <h6 className="fw-bold">Category</h6>
              <p>Business Category</p>
            </li>
          </ul>
          <a
            href="/customer/singlebusiness"
            className="btn btn-outline-primary"
            >Explore</a
          >
        </div>
      </div>

      </Row>
    </>
  )
}

export default BusinessListCard