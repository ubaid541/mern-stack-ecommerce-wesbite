import React from 'react'
import { Card } from 'react-bootstrap'
import { ArrowRight } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

const CategoryCard = ({category}) => {
  return (
    <>
        <div className='category_list' >

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{category?.cat_name}</Card.Title>
                    <Link to={`/customer/singlecategory/${category?._id}`} className='btn btn-primary mt-2'><ArrowRight/> Explore  </Link>
                </Card.Body>
            </Card>
       
        </div>

    </>
  )
}

export default CategoryCard