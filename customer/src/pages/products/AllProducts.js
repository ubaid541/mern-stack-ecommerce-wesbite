import React from 'react'
import { ProductCard } from '../../components'
import useFetch from '../../hooks/useFetch'

const AllProducts = () => {
  let limit = 4
const product = useFetch(`/customer/product/`,limit)
  return (
    
    <>
        <div className='all_products m-5'>
            <div className='all_products_heading my-5'></div>
            <h3>All Products</h3>

            <div className='product_list grid  my-5' >

                {product.data?.map((item,index)=>(
                <ProductCard product={item}/>
                ))}
          </div>
        </div>
    </>
  )
}

export default AllProducts