import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {CategoryCard, ProductCard} from "../../components"
import useFetch from '../../hooks/useFetch'

const SingleBusinessPage = () => {
  const {id} = useParams()
  const singleBusiness = useFetch(`/customer/singlebusiness/${id}`)

  return (
    <>
        <div className='single_business_hero my-5'>
          <h3>Welcome to <span className='text-danger'>{singleBusiness.data[0]?.business_name}</span></h3>
        </div>

        <div className='business_body '>
        <div className='container single_business_body mb-5 border border-1 rounded-5 p-5'>
          <div className='single_business_details'>
          <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="home" title="Categories" className='py-4'>

        <div className='business_product_category grid'>

        {singleBusiness.data[2] !== undefined && singleBusiness.data[2].length > 0 ?
          singleBusiness.data[2]?.map((item,index)=>(
        <CategoryCard category={item}/>
          )):"No categories found."}
        </div>
        
      </Tab>
      <Tab eventKey="profile" title="Products" className='py-4'>

            <div className='business_product grid'>

            {singleBusiness.data[1] !== undefined && singleBusiness.data[1].length > 0 ?
          singleBusiness.data[1]?.map((item,index)=>(
             <ProductCard product={item}/>
          )):"No Product found."}
            </div>
       
      </Tab>
    </Tabs>
          </div>
        </div>
        </div>
    </>
  )
}

export default SingleBusinessPage