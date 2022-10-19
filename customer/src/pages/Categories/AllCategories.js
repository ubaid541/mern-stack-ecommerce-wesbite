import React from 'react'
import { Container } from 'react-bootstrap'
import { CategoryCard } from '../../components'

const AllCategories = () => {
  return (
    <>
        <section className='allCategories'>
            <Container fluid="md">
                <div className='all_category_heading my-5'>
                   <h2>All Categories</h2>
                </div>
                <div>
                <CategoryCard/>
                </div>
            </Container>
        </section>
    </>
  )
}

export default AllCategories