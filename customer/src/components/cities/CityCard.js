import React from 'react'
import { Card } from 'react-bootstrap'
import { ArrowRight } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

import "./CityCard.css"



const CityCard = ({city}) => {
  return (
    <>
         <div className='category_list'>
            <div className='row'>
            <Card style={{ width: '18rem' }} className="category_card">
                <Card.Body>
                    <Card.Title style={{color:'#fffff7'}}>{city?.city_name}</Card.Title>
                    <Link to={`/customer/singlecity/${city?._id}`} className='btn btn-primary mt-2'><ArrowRight/> Explore  </Link>
                </Card.Body>
            </Card>
            </div>
        </div>

    </>
  )
}

export default CityCard