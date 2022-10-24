import React from 'react'
import { useParams } from 'react-router-dom'
import { ProductCard } from '../../components'
import useFetch from '../../hooks/useFetch'

const SingleCategoryPage = () => {
  const {id} = useParams()
  const limit = 0

  const singleCategory = useFetch(`/customer/singlecategory/${id}`,limit)

  return (

    <>
      <div className='singleCategoryPage m-5'>
        <div className='singleCat_heading'>
          <h3>Category: <span className='text-danger'>{singleCategory.data[0]?.cat_name}</span> </h3> 
        </div>

        <div className='single_cat_product grid  my-5' >

          {singleCategory.data[1] !== undefined && singleCategory.data[1].length > 0 ?
          singleCategory.data[1]?.map((item,index)=>(
              
                <ProductCard product={item}/>

          )):"No products in this category"}
        </div>
      </div>
    </>
  )
}

export default SingleCategoryPage