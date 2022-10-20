import React from 'react'
import { Container } from 'react-bootstrap'
import { CategoryCard } from '../../components'

const AllCategories = () => {
  return (
    <>
        <div className='allCategories'>
            <Container fluid="md">
                <div className='all_category_heading my-5'>
                   <h2>All Categories</h2>
                </div>
                <div className='mb-5'>
                <CategoryCard/>
                </div>
                
            </Container>
        </div>
    </>
  )
}

export default AllCategories