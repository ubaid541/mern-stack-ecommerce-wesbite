import React from 'react'
import { Card } from 'react-bootstrap'
import { ArrowRight } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

import "./CityCard.css"



const CityCard = () => {
  return (
    <>
         <div className='category_list'>
            <div className='row'>
            <Card style={{ width: '18rem' }} className="category_card">
                <Card.Body>
                    <Card.Title style={{color:'#fffff7'}}>Card Title</Card.Title>
                    <Link to="/customer/city" className='btn btn-primary mt-2'><ArrowRight/> Explore  </Link>
                </Card.Body>
            </Card>
            </div>
        </div>

        <div className='category_list_btn my-3'>
            <Link to="/customer/cities" className='btn btn-primary'> All Cities. </Link>
        </div>
    </>
  )
}

export default CityCard