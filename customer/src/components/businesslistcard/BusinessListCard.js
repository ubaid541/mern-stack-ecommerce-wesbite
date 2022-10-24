import React from 'react'
import { Row } from 'react-bootstrap'

const BusinessListCard = ({business}) => {
  return (
    <>
    <Row>
      <div className="card card-style mx-4" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{business?.business_name}</h5>
          <ul className="list-group list-group-flush my-4">
            <li className="list-group-item d-flex justify-content-between">
              <h6 className="fw-bold">City</h6>
              <p>{business?.city?.city_name}</p>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <h6 className="fw-bold">Type</h6>
              <p>{business?.business_type?.business_type_name}
              </p>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <h6 className="fw-bold">Category</h6>
              <p>{business?.business_category?.business_category_name}</p>
            </li>
          </ul>
          <a
            href={`/customer/singlebusiness/${business._id}`}
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