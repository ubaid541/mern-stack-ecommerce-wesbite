import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ProductCard, SingleProduct } from '../../components'
import useFetch from '../../hooks/useFetch'

const SingleProductPage = () => {

  const {id} = useParams()
  const limit = 4

  const singleProduct = useFetch(`/customer/singleproduct/${id}`)
  const product = useFetch(`/customer/product/`,limit)

  return (
    
    <>

      (<div className='singleProductPage m-5'>
        <SingleProduct product={singleProduct.data}/>
      </div>

      <hr/>

      <div className='related_products m-5 '>
        <h4 className='mb-4'>More Products</h4>

        <div className='more_products' sx={{ marginLeft:"20px" }}  style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gridGap:'20px'}}>

       {product.data?.map((item,index)=>(
          <ProductCard product={item}/>
          ))}
          
        </div>

      </div>
    </>
  )
}

export default SingleProductPage