import React from 'react'
import { Card } from 'react-bootstrap'
import { ArrowRight } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

const CategoryCard = () => {
  return (
    <>
        <div className='category_list'>
            <div className='row'>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Link to="/customer/singlecategory" className='btn btn-primary mt-2'><ArrowRight/> Explore  </Link>
                </Card.Body>
            </Card>
            </div>
        </div>

    </>
  )
}

export default CategoryCard