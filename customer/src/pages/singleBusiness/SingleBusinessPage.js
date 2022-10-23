import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import {CategoryCard, ProductCard} from "../../components"

const SingleBusinessPage = () => {
  return (
    <>
        <div className='single_business_hero my-5'>
          <h3>Welcome to <span className='text-danger'>Business Name</span></h3>
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
        <CategoryCard/>
        
      </Tab>
      <Tab eventKey="profile" title="Products" className='py-4'>
       <ProductCard/>
       
      </Tab>
    </Tabs>
          </div>
        </div>
        </div>
    </>
  )
}

export default SingleBusinessPage