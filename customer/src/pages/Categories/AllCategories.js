import React from 'react'
import { Container } from 'react-bootstrap'
import { CategoryCard } from '../../components'
import useFetch from '../../hooks/useFetch'
import "./AllCategories.css"

const AllCategories = () => {
  let limit = 0

  const category = useFetch(`/customer/category/`,limit)
  return (
    <>
        <div className='allCategories'>
            <Container fluid="md">
                <div className='all_category_heading my-5'>
                   <h2>All Categories</h2>
                </div>
                <div className='mb-5 grid'>
                {category.data?.map((item,index)=>(
           <CategoryCard category={item}/>
             ))}
                </div>
                
            </Container>
        </div>
    </>
  )
}

export default AllCategories