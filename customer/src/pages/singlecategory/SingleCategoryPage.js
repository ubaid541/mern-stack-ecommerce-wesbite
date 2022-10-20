import React from 'react'
import { ProductCard } from '../../components'

const SingleCategoryPage = () => {
  return (
    <>
      <div className='singleCategoryPage m-5'>
        <div className='singleCat_heading'>
          <h3>Category: <span className='text-danger'>Category Name</span> </h3> 
        </div>

        <div className='single_cat_product my-5'>
          <ProductCard/>
        </div>
      </div>
    </>
  )
}

export default SingleCategoryPage