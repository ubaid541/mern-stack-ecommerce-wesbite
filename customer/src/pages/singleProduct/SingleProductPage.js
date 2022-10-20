import React from 'react'
import { ProductCard, SingleProduct } from '../../components'

const SingleProductPage = () => {
  return (
    <>
      <div className='singleProductPage m-5'>
        <SingleProduct/>
      </div>

      <hr/>

      <div className='related_products m-5 '>
        <h4 className='mb-4'>More Products</h4>
        <div sx={{ marginLeft:"20px" }}>
        <ProductCard/>
        </div>
      </div>
    </>
  )
}

export default SingleProductPage