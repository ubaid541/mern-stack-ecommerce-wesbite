import React from 'react'
import { ProductCard } from '../../components'

const AllProducts = () => {
  return (
    <>
        <div className='all_products m-5'>
            <div className='all_products_heading my-5'></div>
            <h3>All Products</h3>

            <div className='product_list my-5'>
                <ProductCard/>
            </div>
        </div>
    </>
  )
}

export default AllProducts